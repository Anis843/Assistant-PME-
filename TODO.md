# TODO — NexIA

Suivi des bugs et améliorations, classés par impact sur l'objectif actuel :
**obtenir un premier client**.

> Règle de tri : une tâche monte en priorité seulement si elle augmente les
> chances de signer un client dans les prochaines semaines.

---

## 🔴 Critique — bloque une démonstration

- [ ] **L'API hébergée ne répond plus.** Le front Vercel est en ligne
      (HTTP 200) et pointe toujours vers
      `assistant-pme-production.up.railway.app`, qui renvoie
      `Application not found` sur **toutes** les routes (`/api/health`,
      `/api/auth/login`, `/docs`). Un prospect charge donc une landing page
      impeccable, clique « Créer un compte » et reçoit « Impossible de
      contacter le serveur NexIA ».
      - C'est l'URL mise en avant dans le README et destinée à LinkedIn/Upwork.
      - À faire : redéployer l'API (Railway, ou un Space Hugging Face — le
        `Dockerfile` cible déjà ce dernier), vérifier `CORS_ORIGINS` et
        `VITE_API_URL`, puis rejouer le parcours complet
        inscription → import → question.
      - Tant que ce point n'est pas réglé, aucun autre ne compte.

- [ ] **Aucune surveillance de disponibilité.** Cette panne a été découverte
      par un audit du code, pas par une alerte. Brancher un contrôle gratuit
      (UptimeRobot ou équivalent) sur `/api/health` : sinon la prochaine
      coupure sera découverte par un prospect — ou jamais.

---

## 🟡 Important — UX perfectible

- [ ] **Le paramètre `document_id` de `/api/chat` est inopérant.** Il est
      accepté par le schéma mais ignoré : la recherche porte toujours sur tous
      les documents. Soit l'implémenter (filtrer la recherche), soit le retirer
      du schéma.
- [ ] **Débit limité sur Gemini (erreur 429) au bout de quelques questions.**
      Le palier gratuit sature vite. Sans incidence pour une démonstration
      pilotée (3-4 questions), mais à changer avant de diffuser l'URL
      largement. Le provider générique `openai` est en place : trois variables
      d'environnement suffisent pour basculer sur Mistral ou Cerebras, sans
      toucher au code.
- [ ] **Pas de numéro de page dans les sources.** On cite le document, pas
      l'endroit précis — c'est ce qui inspire le plus confiance en démo.
- [ ] **Historique de conversation non persisté.** Rafraîchir la page vide le
      fil ; les questions précédentes ne sont pas non plus renvoyées au LLM
      (pas de questions de suivi type « et pour l'autre contrat ? »).
- [ ] **Pas de suppression de document depuis l'interface.**
- [ ] **Documents perdus au redémarrage du serveur.** Le disque de l'hébergeur
      est éphémère. Le chat continue de répondre (les extraits vectorisés sont
      en base), mais réindexer un ancien document échoue. Un stockage objet
      s'impose avant un vrai déploiement client.
- [ ] **Quatre pages de l'app restent des maquettes** (Dashboard, Analyses,
      Agents, Intégrations), et les réglages ne sont pas persistés. Elles
      portent désormais un bandeau qui le dit — mais le Dashboard reste la
      page d'accueil après connexion. À terme : brancher de vraies données, ou
      faire du Chat la page d'arrivée de `/app/`.
- [ ] **Aucun test automatisé.** Les seuils de filtrage des sources
      (`SOURCE_MIN_SCORE = 0.70`, `SOURCE_MARGIN = 0.02`) sont finement
      calibrés pour `multilingual-e5-small` et rien ne les protège : un
      changement d'embedder ou de seuil dégraderait la pertinence en silence.
      Priorité aux tests de `split_document` et du filtrage des sources.
- [ ] **`requirements.txt` non épinglé** (sauf `bcrypt==4.0.1`). Une version
      majeure de FastAPI, SQLAlchemy ou sentence-transformers peut casser un
      build Docker sans qu'une ligne de code ait changé. `pip freeze` une fois
      le déploiement stabilisé.
- [ ] **CTA « Contacter les ventes » (plan Entreprise)** pointe vers
      `/Register`, faute d'adresse de contact dans le projet. À remplacer par
      un `mailto:` ou un lien de prise de rendez-vous.

---

## 🟢 Plus tard — après les premiers clients

- [ ] **OCR** pour les PDF scannés. Le document est désormais refusé avec un
      statut d'erreur explicite (plus de faux « Indexé »), mais il reste
      inexploitable.
      - Piste alternative à l'OCR classique : un modèle d'embeddings
        **multimodal**, qui vectorise l'image de la page (texte, tableaux,
        graphiques) sans passer par une extraction de texte.
        Exemple repéré : `nvidia/llama-nemotron-embed-vl-1b-v2`.
      - ⚠️ Ne **pas** utiliser la version hébergée gratuite d'OpenRouter :
        les données y sont journalisées pour entraîner le modèle et l'usage
        en production est interdit — incompatible avec notre promesse de
        confidentialité. À n'envisager qu'en auto-hébergé.
      - ⚠️ Changer d'embedder impose une migration de `Vector(384)` et une
        réindexation complète de tous les documents.
- [ ] **Agents spécialisés** (Commercial, RH, Comptabilité) : même moteur RAG,
      prompt et périmètre documentaire dédiés.
- [ ] **Connecteurs** (CRM, Drive, e-mail) — annoncés en feuille de route sur
      la landing page, à prioriser selon les outils des premiers clients.
- [ ] **Autres formats** : Word, Excel, e-mails.
- [ ] **Multi-utilisateurs par entreprise** (rôles, partage de documents).
- [ ] **Export des réponses** (PDF, copier-coller enrichi).
- [ ] **Tableau de bord d'usage** alimenté par de vraies données (questions
      posées, documents les plus consultés).
- [ ] **Migrations Alembic.** `alembic` est déclaré dans `requirements.txt`
      mais inutilisé : le schéma est créé par `Base.metadata.create_all`. À
      mettre en place dès que le schéma commencera à évoluer souvent.

---

## ✅ Fait

- [x] Authentification (inscription, connexion, JWT)
- [x] Import et indexation de PDF
- [x] Recherche vectorielle (pgvector)
- [x] Chat RAG avec réponses sourcées
- [x] LLM interchangeable (Ollama / Gemini / Groq / tout service compatible
      OpenAI)
- [x] Filtrage des sources par pertinence
- [x] Modèle d'embeddings adapté à la recherche (multilingual-e5-small)
- [x] Correction de la troncature des réponses Gemini (jetons de réflexion)
- [x] Aucune source affichée quand l'information est absente des documents
- [x] Formatage des réponses (paragraphes, listes, gras)
- [x] Auto-scroll du fil de conversation
- [x] Garde et message clair si aucun document indexé
- [x] Messages d'erreur explicites (serveur ou IA injoignable)
- [x] Questions suggérées au démarrage
- [x] README, licence et captures d'écran
- [x] **Déploiement en ligne** — frontend Vercel, backend Railway (Docker),
      base Neon (pgvector). *(Front toujours en ligne ; API à redéployer,
      voir section Critique.)*
- [x] **Interface responsive** — `Sidebar` en tiroir avec bouton hamburger,
      `DocumentContextPanel` en volet sous `lg`, tableau Documents replié sur
      petit écran.
- [x] **Un PDF sans texte extractible n'est plus marqué « Indexé ».** Il passe
      au statut `error` : un PDF scanné produisait zéro extrait et affichait
      pourtant une pastille verte, puis le chat répondait « Je ne trouve pas
      cette information » sans que rien ne l'explique.
- [x] **Upload en flux, taille bornée.** Le corps de la requête était
      entièrement chargé en mémoire *avant* la vérification de taille : la
      limite de 20 Mo ne protégeait rien. L'extension est désormais validée
      avant toute lecture, et l'écriture s'arrête au premier bloc en excès,
      sans laisser de fichier partiel.
- [x] **Politique de mot de passe** (8 à 72 caractères). Un mot de passe d'un
      seul caractère était accepté ; au-delà de 72 octets, bcrypt tronque en
      silence, rendant deux mots de passe interchangeables.
- [x] **`get_current_user` dédupliqué.** La dépendance existait en deux copies
      (`core/security.py` et `api/deps.py`) et les routeurs importaient tantôt
      l'une, tantôt l'autre. Une seule implémentation subsiste, dans
      `api/deps.py`.
- [x] **Recharts sorti du chargement initial.** 392 ko (112 ko gzip) étaient
      préchargés sur toutes les pages, landing comprise, pour des graphiques
      fictifs. Pages secondaires en `React.lazy` et `recharts` retiré de
      `manualChunks` : ~113 ko gzip de moins au premier chargement (−55 %).
- [x] **Landing page réalignée sur le produit réel.** « +80 connecteurs
      natifs » sous un titre au présent est devenu une feuille de route
      assumée ; les fonctionnalités non livrées des plans tarifaires portent
      une pastille « à venir ».
- [x] **CTA des cartes tarifaires fonctionnels.** Les trois boutons n'avaient
      aucun gestionnaire : un prospect convaincu par la grille cliquait
      « Commencer » et restait sur la page.
- [x] **Bandeaux « données d'illustration »** sur les pages maquettes.
- [x] **Route de repli** pour les URL inconnues (plus d'écran blanc).
- [x] Découpage du bundle frontend (react / pages différées)
