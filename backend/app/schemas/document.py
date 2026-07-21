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