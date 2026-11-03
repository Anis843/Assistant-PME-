from sqlalchemy import create_engine
from sqlalchemy.engine.url import make_url
from sqlalchemy.orm import sessionmaker, declarative_base

from app.core.config import settings


def _normalize_database_url(raw: str) -> str:
    """Force un pilote PostgreSQL explicite dans l'URL de connexion.

    Deux pièges d'hébergeur, qui font tous deux échouer le démarrage à
    l'import — donc avant que FastAPI existe, sans message exploitable :

    1. Railway et Heroku fournissent un `DATABASE_URL` en « postgres:// »,
       schéma que SQLAlchemy ne connaît pas :
       « Can't load plugin: sqlalchemy.dialects:postgres ».

    2. Le schéma nu « postgresql:// » laisse SQLAlchemy choisir le pilote, et
       ce choix a changé de version en version : jusqu'à SQLAlchemy 2.0 il
       désignait psycopg2, depuis la 2.1 il désigne psycopg (v3). Comme
       `requirements.txt` installe `psycopg2-binary`, toute image reconstruite
       après la sortie de la 2.1 plantait au démarrage sur
       « No module named 'psycopg' » — sans qu'une ligne de code ait changé.
       C'est ce qui a mis l'API en boucle de redémarrage sur Railway, alors
       qu'elle fonctionnait en local avec SQLAlchemy 2.0 déjà installé.

    Nommer le pilote rend la connexion indépendante de la version de
    SQLAlchemy résolue au build, et accepte indifféremment les deux schémas.
    """
    url = make_url(raw)
    if url.drivername in ("postgres", "postgresql"):
        url = url.set(drivername="postgresql+psycopg2")
    return url.render_as_string(hide_password=False)


engine = create_engine(_normalize_database_url(settings.database_url), pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """Dependency FastAPI : fournit une session DB et la ferme après la requête."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
