from datetime import datetime, timedelta, timezone

from jose import JWTError, jwt
from passlib.context import CryptContext

from app.core.config import settings

# Primitives de cryptographie et de jetons uniquement.
#
# La dépendance `get_current_user` vivait ici *et* dans app/api/deps.py, en deux
# copies quasi identiques : les routeurs importaient tantôt l'une, tantôt
# l'autre, soit deux chemins d'authentification à maintenir en parallèle. Elle
# est désormais définie une seule fois, dans app/api/deps.py — sa place pour une
# dépendance FastAPI, et la seule des deux versions dont le `tokenUrl` portait
# la barre oblique initiale attendue par la page /docs.

ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=settings.access_token_expire_minutes
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.secret_key, algorithm=ALGORITHM)


def decode_access_token(token: str) -> dict | None:
    try:
        return jwt.decode(token, settings.secret_key, algorithms=[ALGORITHM])
    except JWTError:
        return None
