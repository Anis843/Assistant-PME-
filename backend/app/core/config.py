from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Configuration centralisée de l'app, lue depuis les variables d'environnement
    (ou un fichier .env en local). Voir .env.example à la racine du backend.
    """

    database_url: str
    secret_key: str
    access_token_expire_minutes: int = 60 * 24 * 7  # 7 jours

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()