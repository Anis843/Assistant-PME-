# models/document_chunk.py
import uuid

from pgvector.sqlalchemy import Vector
from sqlalchemy import Column, ForeignKey, Integer, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.database.session import Base

# Dimension de sortie de intfloat/multilingual-e5-small.
# Changer de modèle d'embeddings impose de réindexer tous les documents ; si la
# dimension diffère, une migration de cette colonne est également nécessaire.
EMBEDDING_DIM = 384


class DocumentChunk(Base):
    __tablename__ = "document_chunks"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    document_id = Column(UUID(as_uuid=True), ForeignKey("documents.id"), nullable=False)
    chunk_index = Column(Integer, nullable=False)
    content = Column(Text, nullable=False)
    embedding = Column(Vector(EMBEDDING_DIM), nullable=False)

    document = relationship("Document", back_populates="chunks")
