import uuid
from datetime import datetime
from pydantic import BaseModel
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