<div align="center">

# 🧠 NexIA

### Assistant IA documentaire pour PME — posez des questions à vos documents en langage naturel

*Importez vos PDF. Interrogez-les. Obtenez des réponses sourcées, en français, en quelques secondes.*

![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-pgvector-4169E1?logo=postgresql&logoColor=white)
![Ollama](https://img.shields.io/badge/LLM-Ollama%20%7C%20Gemini%20%7C%20Groq-000000)
![Licence](https://img.shields.io/badge/Licence-Propri%C3%A9taire-red)

</div>

---

## 🚀 Démo en ligne

### **[assistant-pme-teal.vercel.app](https://assistant-pme-teal.vercel.app)**

Créez un compte, importez un PDF, posez vos questions en français.

> **Instance de démonstration.** Les documents importés sont effacés au
> redémarrage du serveur, et la génération passe par un LLM hébergé.
> En déploiement client, NexIA bascule en **mode local** (Ollama) par une simple
> variable d'environnement : les documents ne quittent alors jamais votre
> infrastructure.

---

## 🎯 Le problème

Les PME, cabinets comptables, avocats et agences immobilières croulent sous les documents : contrats, factures, procédures, comptes-rendus. Retrouver **la bonne information au bon moment** prend un temps précieux — et personne n'a le temps de tout relire.

## 💡 La solution

**NexIA** transforme n'importe quel PDF en base de connaissances interrogeable. Vous posez une question en langage naturel, et l'assistant vous répond **en s'appuyant uniquement sur vos documents**, en citant ses sources.

> **« Combien coûte le contrat de maintenance annuel ? »**
> → *« Le contrat de maintenance annuel coûte 4 500 euros. »*
> 📄 Source : `Contrat.pdf`

Le tout avec une garantie forte : en mode local (Ollama), **vos documents ne quittent jamais votre infrastructure.**

---

## 📸 Aperçu

| Page d'accueil | Import de documents | Chat RAG sourcé |
|:---:|:---:|:---:|
| ![Landing](docs/screenshots/landing.png) | ![Documents](docs/screenshots/documents.png) | ![Chat](docs/screenshots/chat.png) |

---

## ✨ Fonctionnalités

- 🔐 **Authentification complète** — inscription, connexion, JWT, mots de passe hachés (bcrypt)
- 📄 **Import de PDF** — upload sécurisé avec validation (type, taille)
- 🧩 **Pipeline RAG automatique** — extraction du texte → découpage en chunks → vectorisation → indexation
- 🔎 **Recherche sémantique** — recherche vectorielle par similarité cosinus via **pgvector**
- 💬 **Chat en langage naturel** — réponses générées à partir de vos documents, en français
- 📚 **Réponses sourcées** — chaque réponse cite les documents utilisés
- 🔄 **LLM interchangeable** — bascule entre **Ollama** (local/confidentiel), **Google Gemini**, **Groq** ou tout service compatible OpenAI (**Mistral**, **Cerebras**…) par une simple variable d'environnement
- 🎨 **Interface moderne** — SPA React 19 + Tailwind CSS 4, responsive et soignée

---

## 🏗️ Architecture

```mermaid
flowchart LR
    U[👤 Utilisateur] -->|Question| FE[React SPA]
    FE -->|POST /api/chat| API[FastAPI]

    subgraph Backend
        API --> VS[Recherche vectorielle<br/>pgvector]
        VS --> DB[(PostgreSQL<br/>+ embeddings)]
        VS -->|Top 5 passages| PR[Construction du prompt]
        PR --> LLM{LLM Provider}
    end

    LLM -->|Ollama local| OL[llama3.2]
    LLM -->|Gemini| GE[Gemini Flash]
    LLM -->|Groq| GR[Llama 3.3 70B]

    LLM -->|Réponse + sources| FE
```

### Pipeline RAG (indexation d'un document)

```
PDF uploadé
   │
   ▼
Extraction du texte (pypdf)
   │
   ▼
Découpage en chunks (800 caractères, chevauchement 100)
   │
   ▼
Vectorisation locale (sentence-transformers, modèle multilingue FR)
   │
   ▼
Stockage des embeddings en base (PostgreSQL + pgvector)
```

---

## 🛠️ Stack technique

| Domaine | Technologies |
|---------|-------------|
| **Backend** | FastAPI, Uvicorn, SQLAlchemy, Pydantic |
| **Base de données** | PostgreSQL + extension **pgvector** (recherche vectorielle) |
| **Embeddings** | `sentence-transformers` — modèle `multilingual-e5-small` (local, multilingue, optimisé pour la recherche) |
| **LLM** | Ollama (local) · Google Gemini · Groq — *interchangeables* |
| **Authentification** | JWT (python-jose), hachage bcrypt (passlib) |
| **Traitement PDF** | pypdf |
| **Frontend** | React 19, Vite 8, Tailwind CSS 4, React Router 7, Lucide, Recharts |

---

## 🚀 Démarrage rapide

### Prérequis

- **Python 3.11+**
- **Node.js 20+**
- **PostgreSQL** avec l'extension **pgvector** installée
- **[Ollama](https://ollama.com)** (pour le mode LLM local) — optionnel si vous utilisez Gemini/Groq

### 1. Base de données

Créez une base PostgreSQL et un utilisateur, puis assurez-vous que l'extension pgvector est disponible (elle est activée automatiquement au démarrage de l'API).

### 2. Backend

```bash
cd backend

# Environnement virtuel
python -m venv .venv
source .venv/Scripts/activate   # Windows Git Bash
# .venv\Scripts\activate        # Windows PowerShell
# source .venv/bin/activate     # macOS / Linux

# Dépendances
pip install -r requirements.txt

# Configuration (voir section ci-dessous)
cp .env.example .env            # puis éditez .env

# Lancement
uvicorn app.main:app --reload
```

L'API démarre sur `http://localhost:8000` — documentation interactive sur `http://localhost:8000/docs`.

### 3. LLM local (Ollama)

```bash
ollama pull llama3.2:3b   # modèle léger et rapide (par défaut)
# Ollama démarre son serveur automatiquement sur le port 11434
```

### 4. Frontend

```bash
cd frontend
npm install
npm run dev
```

L'application est disponible sur `http://localhost:5173`.

---

## ⚙️ Configuration

Créez un fichier `.env` dans `backend/` :

```env
# Base de données
DATABASE_URL=postgresql://user:password@localhost:5432/nexia_db

# Sécurité (générez une clé aléatoire)
SECRET_KEY=votre_cle_secrete

# Choix du LLM : ollama | gemini | groq
LLM_PROVIDER=ollama

# --- Ollama (local, gratuit, confidentiel) ---
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2:3b

# --- Google Gemini (hébergé, gratuit) ---
GEMINI_API_KEY=
GEMINI_MODEL=gemini-flash-latest

# --- Groq (hébergé, gratuit) ---
GROQ_API_KEY=
GROQ_MODEL=llama-3.3-70b-versatile
```

### Basculer d'un LLM à l'autre

Changez simplement `LLM_PROVIDER`, puis redémarrez le backend :

| `LLM_PROVIDER` | Modèle par défaut | Confidentialité | Clé requise |
|----------------|-------------------|-----------------|-------------|
| `ollama` | `llama3.2:3b` (local) | ✅ Données locales | — |
| `gemini` | `gemini-flash-latest` | ❌ Hébergé | `GEMINI_API_KEY` |
| `groq` | `llama-3.3-70b-versatile` | ❌ Hébergé | `GROQ_API_KEY` |
| `openai` | *au choix* | ❌ Hébergé | `OPENAI_BASE_URL`, `OPENAI_API_KEY`, `OPENAI_MODEL` |

Le mode `openai` cible **n'importe quel service exposant l'API OpenAI** — Mistral,
Cerebras, Hugging Face, Together… Changer de fournisseur ne demande alors aucune
modification du code : trois variables d'environnement suffisent.

---

## 📡 Aperçu de l'API

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `POST` | `/api/auth/register` | Créer un compte |
| `POST` | `/api/auth/login` | Se connecter (retourne un JWT) |
| `GET` | `/api/auth/me` | Profil de l'utilisateur connecté |
| `POST` | `/api/documents/upload` | Importer un PDF (indexation en tâche de fond) |
| `GET` | `/api/documents/` | Lister ses documents |
| `POST` | `/api/documents/search` | Recherche vectorielle brute |
| `POST` | `/api/chat` | Poser une question (RAG complet) |

---

## 📁 Structure du projet

```
.
├── backend/
│   └── app/
│       ├── core/         # config, sécurité (JWT)
│       ├── database/     # session SQLAlchemy
│       ├── models/       # User, Document, DocumentChunk
│       ├── schemas/      # schémas Pydantic
│       ├── routers/      # auth, documents, chat
│       ├── services/     # document_service (RAG), llm_service, user_service
│       └── main.py       # point d'entrée FastAPI
└── frontend/
    └── src/
        ├── components/   # UI (dashboard, auth, chat, landing)
        ├── pages/        # Login, Register, Dashboard, Documents, Chat…
        └── lib/          # client API, gestion du token
```

---

## 🗺️ Roadmap

- [x] Authentification + gestion des utilisateurs
- [x] Import et indexation de PDF
- [x] Recherche vectorielle (pgvector)
- [x] Chat RAG avec réponses sourcées
- [x] LLM interchangeable (Ollama / Gemini / Groq / tout service compatible OpenAI)
- [x] Déploiement en ligne (Vercel · Railway · Neon)
- [ ] **Agents spécialisés** (Commercial, RH, Comptabilité…) — prompts et périmètres dédiés
- [ ] Numéros de page précis dans les sources
- [ ] OCR pour les PDF scannés
- [ ] Stockage objet pour les documents importés (persistance entre redémarrages)

---

## 👤 Auteur

**Anis Ouaret**
Projet développé de bout en bout : conception, backend, frontend, pipeline IA.

---

## 📄 Licence

**Propriétaire — tous droits réservés.** Le code source est consultable à des fins
de démonstration et d'évaluation uniquement. Toute reproduction, modification,
distribution ou utilisation commerciale est interdite sans autorisation écrite
de l'auteur. Voir le fichier [`LICENSE`](LICENSE) pour les termes complets.
