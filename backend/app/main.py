from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from app.models import document, document_chunk
from app.database.session import Base, engine
from app.routers import auth,documents

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

# En dev, autorise le frontend Vite (généralement http://localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(documents.router)

@app.get("/api/health")
def health_check():
    return {"status": "ok"}