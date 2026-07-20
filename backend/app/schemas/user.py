import uuid
from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str | None = None
    company_name: str | None = None


class UserOut(BaseModel):
    id: uuid.UUID
    email: EmailStr
    full_name: str | None = None
    company_name: str | None = None

    class Config:
        from_attributes = True