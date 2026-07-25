# Image de déploiement de l'API NexIA — cible : Hugging Face Spaces (SDK Docker).
FROM python:3.11-slim

# Les Spaces exécutent le conteneur sous l'utilisateur 1000, jamais root.
# Tout ce que l'application écrit (uploads, cache des modèles) doit donc lui
# appartenir, sinon l'app démarre puis échoue à la première écriture.
RUN useradd -m -u 1000 user
USER user

ENV HOME=/home/user
ENV PATH=/home/user/.local/bin:$PATH

# sentence-transformers stocke les poids téléchargés ici. Le défaut (~/.cache)
# pointerait vers un dossier non inscriptible côté Space.
ENV HF_HOME=/home/user/.cache/huggingface

# Sans ça, les logs Python sont bufferisés et n'apparaissent pas dans la console
# du Space — impossible de diagnostiquer un démarrage qui échoue.
ENV PYTHONUNBUFFERED=1

WORKDIR $HOME/app

# PyTorch d'abord, depuis l'index CPU de PyTorch. Le paquet `torch` publié sur
# PyPI embarque les dépendances CUDA (~2,5 Go de bibliothèques NVIDIA), inutiles
# sur un Space CPU et suffisantes à faire dépasser le quota de disque du build.
# En l'installant en premier, l'installation suivante le voit déjà satisfait.
RUN pip install --no-cache-dir --user --index-url https://download.pytorch.org/whl/cpu torch

COPY --chown=user requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

# Pré-télécharge le modèle d'embeddings (~470 Mo) dans l'image. Sans cette
# étape, c'est le premier document importé qui déclenche le téléchargement :
# une minute d'attente inexpliquée, en pleine démonstration client.
RUN python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('intfloat/multilingual-e5-small')"

COPY --chown=user . .

# Port attendu par Hugging Face Spaces (doit correspondre à app_port du README).
EXPOSE 7860

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7860"]
