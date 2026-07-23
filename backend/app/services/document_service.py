import logging
import os
import uuid

from pypdf import PdfReader
from sentence_transformers import SentenceTransformer

from app.database.session import SessionLocal
from app.models.document import Document, DocumentStatus
from app.models.document_chunk import DocumentChunk

logger = logging.getLogger(__name__)

UPLOAD_DIR = "uploads"
ALLOWED_EXTENSIONS = {".pdf"}
MAX_FILE_SIZE = 20 * 1024 * 1024  # 20 Mo

CHUNK_SIZE = 800  # caractères par chunk (approximatif, découpe par mots)
CHUNK_OVERLAP = 100  # chevauchement entre deux chunks consécutifs

# Modèle multilingue (adapté au français), léger, tourne en local/CPU.
#
# e5 est entraîné pour la recherche *asymétrique* : faire correspondre une
# question à un passage qui contient la réponse. C'est précisément notre cas.
# Un modèle de paraphrase, lui, compare deux phrases de même nature et classe
# mal les extraits pour du RAG.
#
# Contrepartie : e5 attend des préfixes explicites selon le rôle du texte.
# Les omettre dégrade nettement la pertinence.
EMBEDDING_MODEL_NAME = "intfloat/multilingual-e5-small"
QUERY_PREFIX = "query: "  # côté question
PASSAGE_PREFIX = "passage: "  # côté extrait indexé

_embedding_model = None


def _get_embedding_model() -> SentenceTransformer:
    # Chargement paresseux : le modèle (~470 Mo) n'est téléchargé/chargé
    # qu'au premier document traité, pas au démarrage de l'API.
    global _embedding_model
    if _embedding_model is None:
        _embedding_model = SentenceTransformer(EMBEDDING_MODEL_NAME)
    return _embedding_model


def save_file(original_filename: str, content: bytes) -> tuple[str, str]:
    """Valide (extension, taille) et écrit le fichier sur disque.

    Retourne (nom_stocké, chemin_complet).
    """
    ext = os.path.splitext(original_filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise ValueError("Seuls les fichiers PDF sont acceptés.")
    if len(content) > MAX_FILE_SIZE:
        raise ValueError("Fichier trop volumineux (max 20 Mo).")

    os.makedirs(UPLOAD_DIR, exist_ok=True)
    stored_filename = f"{uuid.uuid4()}{ext}"
    file_path = os.path.join(UPLOAD_DIR, stored_filename)

    with open(file_path, "wb") as f:
        f.write(content)

    return stored_filename, file_path


def load_document(file_path: str) -> str:
    """Extrait le texte brut d'un PDF, page par page."""
    reader = PdfReader(file_path)
    pages = [page.extract_text() or "" for page in reader.pages]
    return "\n".join(pages)


def split_document(
    text: str,
    chunk_size: int = CHUNK_SIZE,
    chunk_overlap: int = CHUNK_OVERLAP,
) -> list[str]:
    """Découpe le texte en morceaux chevauchants, sans couper les mots."""
    words = text.split()
    if not words:
        return []

    chunks = []
    start = 0
    while start < len(words):
        chunk_words = []
        length = 0
        end = start
        while end < len(words) and length < chunk_size:
            length += len(words[end]) + 1
            chunk_words.append(words[end])
            end += 1
        chunks.append(" ".join(chunk_words))

        if end >= len(words):
            break

        # Recule pour faire chevaucher le prochain chunk avec la fin de celui-ci.
        back = end
        overlap_length = 0
        while back > start and overlap_length < chunk_overlap:
            back -= 1
            overlap_length += len(words[back]) + 1
        start = back if back > start else end

    return chunks


def _encode(texts: list[str]) -> list[list[float]]:
    """Vectorise des textes déjà préfixés, via sentence-transformers (local)."""
    if not texts:
        return []
    model = _get_embedding_model()
    vectors = model.encode(texts, normalize_embeddings=True)
    return vectors.tolist()


def embed_passages(chunks: list[str]) -> list[list[float]]:
    """Vectorise des extraits de document, en vue de leur indexation."""
    return _encode([PASSAGE_PREFIX + chunk for chunk in chunks])


def embed_query(question: str) -> list[float]:
    """Vectorise une question, en vue d'une recherche."""
    return _encode([QUERY_PREFIX + question])[0]


def search_chunks(db, user_id: uuid.UUID, query_text: str, limit: int = 5) -> list[dict]:
    """Recherche sémantique : vectorise la question et retourne les chunks
    les plus proches (parmi les documents de l'utilisateur), triés par pertinence.
    """
    query_embedding = embed_query(query_text)
    distance = DocumentChunk.embedding.cosine_distance(query_embedding).label("distance")

    results = (
        db.query(DocumentChunk, Document, distance)
        .join(Document, DocumentChunk.document_id == Document.id)
        .filter(Document.user_id == user_id)
        .order_by(distance)
        .limit(limit)
        .all()
    )

    return [
        {
            "document_id": document.id,
            "document_name": document.original_name,
            "content": chunk.content,
            "score": 1 - dist,  # cosine_distance = 1 - similarité cosinus
        }
        for chunk, document, dist in results
    ]


def process_document(document_id: uuid.UUID) -> None:
    """Pipeline RAG complète, lancée en tâche de fond après l'upload.

    Charge le texte du PDF, le découpe, calcule les embeddings et les
    enregistre en base. Fait transiter le statut du document :
    uploaded -> processing -> indexed (ou error en cas d'échec).
    """
    db = SessionLocal()
    try:
        document = db.query(Document).filter(Document.id == document_id).first()
        if document is None:
            return

        document.status = DocumentStatus.processing
        db.commit()

        # Purge les extraits existants : sans ça, relancer l'indexation d'un
        # document (changement de modèle d'embeddings, par exemple) les
        # dupliquerait au lieu de les remplacer.
        db.query(DocumentChunk).filter(
            DocumentChunk.document_id == document.id
        ).delete()

        file_path = os.path.join(UPLOAD_DIR, document.filename)
        text = load_document(file_path)
        chunks = split_document(text)
        embeddings = embed_passages(chunks)

        for index, (content, embedding) in enumerate(zip(chunks, embeddings)):
            db.add(
                DocumentChunk(
                    document_id=document.id,
                    chunk_index=index,
                    content=content,
                    embedding=embedding,
                )
            )

        document.status = DocumentStatus.indexed
        db.commit()
    except Exception:
        logger.exception("Échec du traitement du document %s", document_id)
        db.rollback()
        document = db.query(Document).filter(Document.id == document_id).first()
        if document is not None:
            document.status = DocumentStatus.error
            db.commit()
    finally:
        db.close()
