from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.schemas.document import ChatRequest, ChatResponse
from app.services import llm_service

router = APIRouter(prefix="/api/chat", tags=["chat"])


@router.post("", response_model=ChatResponse)
def chat(
    payload: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Répond à une question en s'appuyant sur les documents de l'utilisateur.

    Recherche vectorielle des passages pertinents, puis génération d'une réponse
    par le LLM local (Ollama). Renvoie la réponse et les sources utilisées.
    """
    try:
        return llm_service.answer_question(db, current_user.id, payload.question)
    except RuntimeError as exc:
        # Erreur côté service LLM (Ollama éteint, timeout…) : 503 avec message clair.
        raise HTTPException(status_code=503, detail=str(exc))
