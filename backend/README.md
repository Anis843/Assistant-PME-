---
title: NexIA API
emoji: 🧠
colorFrom: indigo
colorTo: blue
sdk: docker
app_port: 7860
pinned: false
short_description: API de l'assistant documentaire NexIA (RAG sur PDF)
---

# NexIA — API

Backend de [NexIA](https://github.com/Anis843/Assistant-PME-), l'assistant IA
documentaire pour PME : importez vos PDF, posez vos questions en français,
obtenez des réponses sourcées.

> Cet en-tête YAML est lu par Hugging Face Spaces (SDK Docker, port 7860).
> Il est sans effet quand le backend tourne en local.

L'interface se trouve sur le frontend React déployé séparément. Cette URL
n'expose que l'API.

- Documentation interactive : `/docs`
- État du service : `/api/health`

## Variables d'environnement

| Variable | Rôle |
|----------|------|
| `DATABASE_URL` | PostgreSQL avec l'extension pgvector |
| `SECRET_KEY` | Signature des tokens JWT |
| `CORS_ORIGINS` | Origines autorisées, séparées par des virgules (l'URL du frontend) |
| `LLM_PROVIDER` | `ollama` \| `groq` \| `gemini` |
| `GROQ_API_KEY` | Requise si `LLM_PROVIDER=groq` |

Voir [`.env.example`](.env.example) pour la liste complète.

⚠️ En déploiement, ces variables se définissent dans les **secrets du Space**,
jamais dans un fichier versionné.
