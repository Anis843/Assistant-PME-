from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Configuration centralisée de l'app, lue depuis les variables d'environnement
    (ou un fichier .env en local). Voir .env.example à la racine du backend.
    """

    database_url: str
    secret_key: str
    access_token_expire_minutes: int = 60 * 24 * 7  # 7 jours

    # Origines autorisées à appeler l'API, séparées par des virgules.
    # En local, le serveur Vite ; en production, l'URL Vercel du frontend.
    # Le navigateur bloque toute origine absente de cette liste.
    cors_origins: str = "http://localhost:5173"

    # Fournisseur de LLM : "ollama" (local, données confidentielles),
    # "groq" ou "gemini" (hébergés, plus gros modèles et plus rapides — démos).
    llm_provider: str = "ollama"

    # LLM local via Ollama. En dev, le serveur Ollama écoute sur le port 11434.
    # Surcharge possible via les variables d'environnement OLLAMA_URL / OLLAMA_MODEL.
    ollama_url: str = "http://localhost:11434"
    ollama_model: str = "llama3.2:3b"

    # LLM hébergé via Groq (API compatible OpenAI, tier gratuit).
    # La clé se définit via la variable d'environnement GROQ_API_KEY.
    groq_api_key: str = ""
    groq_model: str = "llama-3.3-70b-versatile"

    # LLM hébergé via Google Gemini (AI Studio, tier gratuit).
    # La clé se définit via la variable d'environnement GEMINI_API_KEY.
    gemini_api_key: str = ""
    gemini_model: str = "gemini-flash-latest"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @property
    def cors_origins_list(self) -> list[str]:
        """Découpe cors_origins en liste, en ignorant les entrées vides."""
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


settings = Settings()