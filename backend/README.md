# NexIA — API

Backend de [NexIA](https://github.com/Anis843/Assistant-PME-), l'assistant IA
documentaire pour PME : importez vos PDF, posez vos questions en français,
obtenez des réponses sourcées.

- Documentation interactive : `/docs`
- État du service : `/api/health`

## Variables d'environnement

| Variable | Rôle |
|----------|------|
| `DATABASE_URL` | PostgreSQL avec l'extension pgvector |
| `SECRET_KEY` | Signature des tokens JWT |
| `CORS_ORIGINS` | Origines autorisées, séparées par des virgules (l'URL du frontend) |
| `PORT` | Port d'écoute. Injecté automatiquement par l'hébergeur ; 7860 par défaut |
| `LLM_PROVIDER` | `ollama` \| `gemini` \| `groq` \| `openai` |
| `GEMINI_API_KEY` | Requise si `LLM_PROVIDER=gemini` |
| `GROQ_API_KEY` | Requise si `LLM_PROVIDER=groq` |
| `OPENAI_BASE_URL` / `OPENAI_API_KEY` / `OPENAI_MODEL` | Requises si `LLM_PROVIDER=openai` — tout service exposant l'API OpenAI (Mistral, Cerebras…) |

Voir [`.env.example`](.env.example) pour la liste complète.

⚠️ En déploiement, ces variables se définissent dans l'interface de
l'hébergeur, jamais dans un fichier versionné.

## Déploiement

Le [`Dockerfile`](Dockerfile) est autonome et ne dépend d'aucun hébergeur
particulier : il installe PyTorch en version CPU, pré-télécharge le modèle
d'embeddings dans l'image, et écoute sur `$PORT`.

Sur Railway, Render ou Cloud Run, il suffit de pointer le service sur le
dossier `backend/` — le Dockerfile est détecté automatiquement.

> ⚠️ Le dossier `uploads/` est éphémère : les fichiers sont perdus au
> redémarrage du conteneur. Sans incidence sur le chat (les extraits
> vectorisés sont en base), mais une réindexation échouerait. Prévoir un
> stockage objet avant une mise en production réelle.
