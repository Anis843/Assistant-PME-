from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from app.core.config import settings
from app.models import document, document_chunk
from app.database.session import Base, engine
from app.routers import auth,documents,chat

# Nécessaire avant create_all : la colonne Vector (document_chunks.embedding)
# s'appuie sur le type Postgres fourni par l'extension pgvector.
# L'extension doit être installée côté serveur Postgres (binaire pgvector),
# cette commande ne fait que l'activer sur cette base.
with engine.connect() as conn:
    conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector"))
    conn.commit()

# À remplacer par Alembic (migrations) dès que le schéma commence à évoluer souvent.
# Pratique pour démarrer, mais ne gère pas les migrations incrémentales.
Base.metadata.create_all(bind=engine)

app = FastAPI(title="NexIA API")

# Origines autorisées, pilotées par la variable d'environnement CORS_ORIGINS :
# le serveur Vite en local, l'URL Vercel du frontend en production.
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(documents.router)
app.include_router(chat.router)

@app.get("/api/health")
def health_check():
    return {"status": "ok"}