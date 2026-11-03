import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.exc import OperationalError

from app.core.config import settings
from app.models import document, document_chunk
from app.database.session import Base, engine
from app.routers import auth, documents, chat

# Journalisation configurée avant toute opération réseau. Sans cela, un échec
# au démarrage n'apparaît dans la console de l'hébergeur que sous forme de
# trace Python brute, et la boucle de redémarrage la noie dans le bruit.
logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
logger = logging.getLogger("nexia.startup")


def _init_database() -> None:
    """Vérifie la connexion, active pgvector, crée les tables manquantes.

    Échoue volontairement vite : servir une API dont la base est inaccessible
    ne ferait que déplacer l'erreur sur la première requête d'un utilisateur.
    Mais chaque cause reçoit un message explicite — diagnostiquer une boucle de
    redémarrage à partir d'un `OperationalError` nu coûte des heures.
    """
    # Le nom d'hôte, jamais les identifiants : les journaux d'un hébergeur sont
    # souvent visibles par toute l'équipe.
    logger.info(
        "Base de données : %s sur %s (pilote %s)",
        engine.url.database,
        engine.url.host,
        engine.dialect.driver,
    )

    try:
        with engine.connect() as conn:
            conn.execute(text("select 1"))
    except OperationalError:
        logger.error(
            "Base de données injoignable sur %s. Vérifiez DATABASE_URL (hôte, "
            "port, identifiants) et que la base accepte les connexions depuis "
            "l'hébergeur.",
            engine.url.host,
        )
        raise

    # Nécessaire avant create_all : la colonne Vector (document_chunks.embedding)
    # s'appuie sur le type Postgres fourni par l'extension pgvector.
    # L'extension doit être installée côté serveur Postgres (binaire pgvector),
    # cette commande ne fait que l'activer sur cette base.
    try:
        with engine.connect() as conn:
            conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector"))
            conn.commit()
    except Exception:
        logger.error(
            "Impossible d'activer l'extension pgvector sur %s. Deux causes "
            "possibles : le serveur Postgres ne l'embarque pas (une instance "
            "Postgres standard ne l'a pas — il faut un service ou une image "
            "pgvector, comme Neon ou pgvector/pgvector), ou l'utilisateur de "
            "connexion n'a pas le droit de créer une extension.",
            engine.url.host,
        )
        raise

    # À remplacer par Alembic (migrations) dès que le schéma commence à évoluer souvent.
    # Pratique pour démarrer, mais ne gère pas les migrations incrémentales.
    Base.metadata.create_all(bind=engine)
    logger.info("Base de données prête.")


_init_database()

app = FastAPI(title="NexIA API")

# Origines autorisées, pilotées par la variable d'environnement CORS_ORIGINS :
# le serveur Vite en local, l'URL Vercel du frontend en production.
#
# Tracé au démarrage : une origine mal orthographiée ne se manifeste que par un
# « 400 Bad Request » sur la requête OPTIONS, sans indiquer ce qui était attendu.
# Comparer cette ligne à l'en-tête Origin du navigateur résout le problème.
logger.info("CORS — origines autorisées : %s", settings.cors_origins_list)

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


# Les sondes de disponibilité des hébergeurs interrogent « / » par défaut.
# Sans cette route, elles recevaient un 404 : selon la configuration, le
# déploiement est alors jugé en échec et redémarré en boucle, alors que l'API
# répond parfaitement sur ses propres routes.
@app.get("/")
def root():
    return {"service": "NexIA API", "status": "ok", "docs": "/docs"}


@app.get("/api/health")
def health_check():
    return {"status": "ok"}
