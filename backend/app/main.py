from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.session import Base, engine
from app.routers import auth

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


@app.get("/api/health")
def health_check():
    return {"status": "ok"}