# Script de démonstration — NexIA (2 minutes)

Objectif : qu'une personne qui ne connaît rien au projet comprenne **le problème
résolu** en moins de deux minutes.

Règle d'or : **ne jamais improviser**. Répéter 3 fois avant d'enregistrer.

---

## ✅ Préparation (à faire AVANT d'enregistrer)

| # | Vérification |
|---|---|
| 1 | Backend démarré : `uvicorn app.main:app --reload` |
| 2 | Frontend démarré : `npm run dev` |
| 3 | `LLM_PROVIDER=gemini` dans `.env` → **réponses instantanées**, pas de démarrage à froid |
| 4 | Poser une question « à blanc » avant d'enregistrer (réveille le service) |
| 5 | Compte de démo connecté, avec les 4 documents **déjà indexés** |
| 6 | Garder **un PDF de côté** (non importé) pour la démo d'upload en direct |
| 7 | Navigateur en plein écran, zoom 100 %, onglets personnels fermés |
| 8 | Notifications système coupées |

> ⚠️ Le point 3 est le plus important : avec Ollama en local, le premier appel
> peut prendre 30 s (chargement du modèle). C'est mortel en vidéo.

---

## 🎬 Le script

### 0:00 — 0:15 · Le problème (Landing Page)

**À l'écran :** page d'accueil.

> « Les PME, les cabinets comptables et les avocats accumulent des centaines de
> documents : contrats, factures, procédures. Retrouver une information précise
> prend un temps fou. NexIA répond à la question à leur place. »

---

### 0:15 — 0:30 · Connexion

**À l'écran :** connexion → dashboard.

> « Chaque entreprise a son espace sécurisé. »

*Ne pas commenter le dashboard en détail — on est là pour le chat.*

---

### 0:30 — 0:50 · Import d'un document

**À l'écran :** page Documents → importer le PDF gardé de côté.

> « J'importe un contrat. NexIA en extrait le texte, le découpe et l'indexe
> automatiquement. En quelques secondes, il est interrogeable. »

**Montrer le statut passer à « Indexé ».**

---

### 0:50 — 1:30 · Le cœur : la question ⭐

**À l'écran :** page Chat.

> « Maintenant, je pose ma question en français, comme à un collègue. »

**Question à poser** (une seule, celle-ci) :

```
Quelles sont les conditions de résiliation ?
```

*Laisser la réponse s'afficher sans parler.* Puis :

> « Réponse en quelques secondes — et surtout : elle cite le document d'où
> vient l'information. Pas d'invention, tout est traçable. »

**Pointer le bloc « Sources » du doigt / à la souris.** C'est le moment clé.

---

### 1:30 — 1:50 · L'argument de confiance

> « Et point important pour des documents confidentiels : NexIA peut tourner
> entièrement en local. Vos contrats ne quittent jamais votre infrastructure. »

---

### 1:50 — 2:00 · Conclusion

> « Vos documents, vos questions, vos réponses. En quelques secondes. »

---

## 💬 Questions de secours

Si la première réponse est décevante, enchaîner avec l'une de celles-ci
(testées, une seule source, réponse nette) :

- « Quel est le montant TTC de la facture ? »
- « Combien de jours de télétravail sont autorisés ? »
- « Quel est le préavis de résiliation du contrat ? »

---

## 🚫 À éviter absolument

- **Ne pas** poser de question à vocabulaire trop générique (« Quel est le
  montant ? », « Quelle est la durée ? ») : plusieurs documents remontent et la
  démonstration paraît floue.
- **Ne pas** montrer les pages incomplètes (Agents, Intégrations, Analyses).
- **Ne pas** parler de la technique (pgvector, embeddings, chunks) : le
  prospect s'en moque. Parler **temps gagné** et **fiabilité**.
- **Ne pas** dépasser 2 minutes. Si ça dure, couper l'import de document.

---

## 🎥 Enregistrement

- Outil : OBS Studio (gratuit) ou l'enregistreur intégré de Windows (`Win + G`).
- Format : 1920 × 1080, 30 fps.
- Faire une prise complète sans coupure — quitte à recommencer.
- Un GIF court (le passage question → réponse → sources) pour le README.
