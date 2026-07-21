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
EMBEDDING_MODEL_NAME = "paraphrase-multilingual-MiniLM-L12-v2"

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


def create_embeddings(chunks: list[str]) -> list[list[float]]:
    """Vectorise une liste de chunks de texte via sentence-transformers (local)."""
    if not chunks:
        return []
    model = _get_embedding_model()
    vectors = model.encode(chunks, normalize_embeddings=True)
    return vectors.tolist()


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

        file_path = os.path.join(UPLOAD_DIR, document.filename)
        text = load_document(file_path)
        chunks = split_document(text)
        embeddings = create_embeddings(chunks)

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
