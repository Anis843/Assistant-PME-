from fastapi import APIRouter, BackgroundTasks, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.document import Document, DocumentStatus
from app.schemas.document import DocumentOut, DocumentUploadResponse, SearchQuery, SearchResult
from app.services import document_service

router = APIRouter(prefix="/api/documents", tags=["documents"])


@router.post("/upload", response_model=DocumentUploadResponse)
async def upload_document(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    content = await file.read()

    try:
        stored_filename, _ = document_service.save_file(file.filename, content)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    document = Document(
        user_id=current_user.id,
        filename=stored_filename,
        original_name=file.filename,
        status=DocumentStatus.uploaded,
    )
    db.add(document)
    db.commit()
    db.refresh(document)

    background_tasks.add_task(document_service.process_document, document.id)

    return {"message": "Document importé avec succès", "document": document}


@router.get("/", response_model=list[DocumentOut])
def list_documents(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return db.query(Document).filter(Document.user_id == current_user.id).all()


@router.post("/search", response_model=list[SearchResult])
def search_documents(
    payload: SearchQuery,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return document_service.search_chunks(db, current_user.id, payload.query, payload.limit)