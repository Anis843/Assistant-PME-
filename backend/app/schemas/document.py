import uuid
from datetime import datetime
from pydantic import BaseModel, Field
from app.models.document import DocumentStatus


class DocumentOut(BaseModel):
    id: uuid.UUID
    original_name: str
    status: DocumentStatus
    uploaded_at: datetime

    class Config:
        from_attributes = True


class DocumentUploadResponse(BaseModel):
    message: str
    document: DocumentOut


class SearchQuery(BaseModel):
    query: str = Field(min_length=1)
    limit: int = 5


class SearchResult(BaseModel):
    document_id: uuid.UUID
    document_name: str
    content: str
    score: float  # similarité cosinus, 1 = identique, 0 = aucun rapport


class ChatRequest(BaseModel):
    question: str = Field(min_length=1)
    # Optionnel : réservé pour un futur filtrage sur un document précis.
    # Pour l'instant la recherche couvre tous les documents de l'utilisateur.
    document_id: uuid.UUID | None = None


class ChatResponse(BaseModel):
    answer: str
    sources: list[SearchResult]