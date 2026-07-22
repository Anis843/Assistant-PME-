import logging
import uuid

import httpx

from app.core.config import settings
from app.services.document_service import search_chunks

logger = logging.getLogger(__name__)

# Nombre de passages récupérés par la recherche vectorielle pour construire le contexte.
TOP_K = 5

# Délai maximum d'attente d'une réponse d'Ollama. Un modèle sur CPU/GPU modeste
# peut être lent : on laisse de la marge pour éviter des timeouts.
OLLAMA_TIMEOUT = 120.0

# Groq est hébergé et très rapide : un délai plus court suffit.
GROQ_TIMEOUT = 60.0

# Bornes de génération communes aux deux providers.
TEMPERATURE = 0.2  # réponses factuelles et stables (peu de créativité)
MAX_TOKENS = 512  # plafonne la longueur de la réponse

# Filtrage des sources affichées :
#  - plancher absolu : en dessous, un passage est jugé hors sujet ;
#  - marge relative : on ne garde que les passages proches du meilleur score,
#    ce qui évite de citer des documents secondaires quand un seul répond.
SOURCE_MIN_SCORE = 0.30
SOURCE_MARGIN = 0.15

SYSTEM_PROMPT = (
    "Tu es NexIA, un assistant qui répond aux questions à partir de documents "
    "d'entreprise. Réponds en français, de façon claire et concise. "
    "Utilise UNIQUEMENT les informations présentes dans le contexte fourni. "
    "Va droit au but : donne directement l'information demandée, sans reformuler "
    "la question ni citer tes sources dans la phrase. "
    "Ne mentionne JAMAIS les numéros d'extraits (« Extrait 1 », etc.) ni les noms "
    "de fichiers (« Contrat_prestation_AtlasDigital.pdf », etc.) dans ta réponse : "
    "les sources sont affichées séparément. "
    "Si la réponse ne se trouve pas dans le contexte, dis-le honnêtement avec "
    "une phrase du type « Je ne trouve pas cette information dans les documents »."
)


def build_prompt(question: str, chunks: list[dict]) -> str:
    """Assemble le prompt final : instructions + contexte extrait + question.

    Chaque passage est numéroté et préfixé de son document d'origine, pour que
    le modèle puisse s'y référer et rester ancré dans les sources.
    """
    context_blocks = []
    for index, chunk in enumerate(chunks, start=1):
        context_blocks.append(
            f"[Extrait {index} — {chunk['document_name']}]\n{chunk['content']}"
        )
    context = "\n\n".join(context_blocks)

    return (
        f"{SYSTEM_PROMPT}\n\n"
        f"Contexte :\n{context}\n\n"
        f"Question : {question}\n\n"
        f"Réponse :"
    )


def _post(url: str, *, json: dict, headers: dict | None, timeout: float, service: str):
    """Enveloppe httpx.post avec une gestion d'erreurs uniforme.

    Traduit les erreurs réseau/HTTP en RuntimeError au message clair, pour que
    l'appelant (le router) puisse les renvoyer telles quelles à l'utilisateur.
    """
    try:
        response = httpx.post(url, json=json, headers=headers, timeout=timeout)
        response.raise_for_status()
        return response.json()
    except httpx.ConnectError as exc:
        raise RuntimeError(f"Le service LLM ({service}) est injoignable.") from exc
    except httpx.HTTPStatusError as exc:
        raise RuntimeError(
            f"Le service LLM ({service}) a répondu avec une erreur "
            f"({exc.response.status_code})."
        ) from exc
    except httpx.TimeoutException as exc:
        raise RuntimeError(
            f"Le service LLM ({service}) a mis trop de temps à répondre. Réessaie."
        ) from exc


def call_ollama(prompt: str) -> str:
    """Appelle le serveur Ollama local et retourne le texte généré.

    Utilise l'endpoint /api/generate en mode non-streamé (réponse complète en
    une fois).
    """
    data = _post(
        f"{settings.ollama_url}/api/generate",
        json={
            "model": settings.ollama_model,
            "prompt": prompt,
            "stream": False,
            "options": {
                "temperature": TEMPERATURE,
                "num_predict": MAX_TOKENS,
                # Fenêtre de contexte suffisante pour les extraits + la question,
                # sans gonfler le KV cache (qui consomme de la VRAM).
                "num_ctx": 4096,
            },
        },
        headers=None,
        timeout=OLLAMA_TIMEOUT,
        service="Ollama",
    )
    return data.get("response", "").strip()


def call_groq(prompt: str) -> str:
    """Appelle l'API Groq (hébergée, compatible OpenAI) et retourne le texte.

    Nécessite GROQ_API_KEY dans l'environnement. Le prompt complet est envoyé
    comme unique message utilisateur (les instructions y sont déjà intégrées).
    """
    if not settings.groq_api_key:
        raise RuntimeError(
            "Provider LLM 'groq' sélectionné mais GROQ_API_KEY est absente."
        )

    data = _post(
        "https://api.groq.com/openai/v1/chat/completions",
        json={
            "model": settings.groq_model,
            "messages": [{"role": "user", "content": prompt}],
            "temperature": TEMPERATURE,
            "max_tokens": MAX_TOKENS,
        },
        headers={"Authorization": f"Bearer {settings.groq_api_key}"},
        timeout=GROQ_TIMEOUT,
        service="Groq",
    )
    return data["choices"][0]["message"]["content"].strip()


def call_gemini(prompt: str) -> str:
    """Appelle l'API Google Gemini (hébergée) et retourne le texte généré.

    Nécessite GEMINI_API_KEY dans l'environnement. La clé est passée via
    l'en-tête x-goog-api-key (plutôt que dans l'URL, pour ne pas la logguer).
    """
    if not settings.gemini_api_key:
        raise RuntimeError(
            "Provider LLM 'gemini' sélectionné mais GEMINI_API_KEY est absente."
        )

    url = (
        "https://generativelanguage.googleapis.com/v1beta/models/"
        f"{settings.gemini_model}:generateContent"
    )
    data = _post(
        url,
        json={
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {
                "temperature": TEMPERATURE,
                "maxOutputTokens": MAX_TOKENS,
            },
        },
        headers={"x-goog-api-key": settings.gemini_api_key},
        timeout=GROQ_TIMEOUT,
        service="Gemini",
    )

    # Une réponse peut être vide si Gemini bloque le contenu (filtres de sécurité).
    candidates = data.get("candidates", [])
    if not candidates:
        raise RuntimeError("Gemini n'a renvoyé aucune réponse (contenu filtré ?).")
    return candidates[0]["content"]["parts"][0]["text"].strip()


# Aiguillage : associe chaque provider à sa fonction d'appel.
_PROVIDERS = {
    "ollama": call_ollama,
    "groq": call_groq,
    "gemini": call_gemini,
}


def generate(prompt: str) -> str:
    """Génère une réponse via le provider LLM configuré (settings.llm_provider)."""
    provider = _PROVIDERS.get(settings.llm_provider)
    if provider is None:
        raise RuntimeError(
            f"Provider LLM inconnu : '{settings.llm_provider}'. "
            f"Valeurs possibles : {', '.join(_PROVIDERS)}."
        )
    return provider(prompt)


def answer_question(
    db, user_id: uuid.UUID, question: str, limit: int = TOP_K
) -> dict:
    """Pipeline RAG complète : recherche → prompt → génération.

    Retourne un dict {answer, sources}. Si aucun passage pertinent n'est trouvé,
    court-circuite l'appel au LLM et renvoie une réponse honnête.
    """
    chunks = search_chunks(db, user_id, question, limit=limit)

    if not chunks:
        return {
            "answer": (
                "Je ne trouve aucun document pertinent pour répondre à cette "
                "question. Assure-toi d'avoir importé et indexé un document."
            ),
            "sources": [],
        }

    prompt = build_prompt(question, chunks)
    answer = generate(prompt)

    # Le LLM reçoit tout le contexte, mais on n'expose comme sources que les
    # passages proches du meilleur score (et au-dessus du plancher absolu),
    # pour ne pas citer de documents secondaires ou hors sujet.
    top_score = chunks[0]["score"]  # chunks triés par pertinence décroissante
    threshold = max(SOURCE_MIN_SCORE, top_score - SOURCE_MARGIN)
    sources = [c for c in chunks if c["score"] >= threshold]
    return {"answer": answer, "sources": sources}
