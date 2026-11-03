import uuid
from pydantic import BaseModel, EmailStr, Field


class UserCreate(BaseModel):
    email: EmailStr
    # min_length : rien n'empêchait jusqu'ici un mot de passe d'un seul
    # caractère — le champ était un `str` nu.
    #
    # max_length : bcrypt ignore silencieusement tout ce qui dépasse 72 octets,
    # sans lever d'erreur (vérifié : un mot de passe de 100 caractères est
    # accepté et haché sur ses 72 premiers). Deux mots de passe partageant leurs
    # 72 premiers octets seraient donc interchangeables à la connexion. La borne
    # rend la limite explicite au lieu de la laisser tronquer en silence.
    password: str = Field(min_length=8, max_length=72)
    full_name: str | None = None
    company_name: str | None = None


class UserOut(BaseModel):
    id: uuid.UUID
    email: EmailStr
    full_name: str | None = None
    company_name: str | None = None

    class Config:
        from_attributes = True