# TODO — NexIA

Suivi des bugs et améliorations, classés par impact sur l'objectif actuel :
**obtenir un premier client**.

> Règle de tri : une tâche monte en priorité seulement si elle augmente les
> chances de signer un client dans les prochaines semaines.

---

## 🔴 Critique — bloque une démonstration

_(rien d'identifié à ce jour — à remplir dès qu'un bug casse le parcours de démo)_

- [ ] …

---

## 🟡 Important — UX perfectible

- [ ] **Le paramètre `document_id` de `/api/chat` est inopérant.** Il est
      accepté par le schéma mais ignoré : la recherche porte toujours sur tous
      les documents. Soit l'implémenter (filtrer la recherche), soit le retirer
      du schéma.
- [ ] **Débit limité sur Gemini (erreur 429) au bout de quelques questions.**
      Le palier gratuit sature vite. La démo en ligne tourne dessus : sans
      incidence pour une démonstration pilotée (3-4 questions), mais à changer
      avant de diffuser l'URL largement (LinkedIn, Upwork). Le provider
      générique `openai` est en place : trois variables d'environnement
      suffisent pour basculer sur Mistral ou Cerebras, sans toucher au code.
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

---

## 🟢 Plus tard — après les premiers clients

- [ ] **OCR** pour les PDF scannés (aujourd'hui : 0 texte extrait, document
      inutilisable).
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
- [ ] **Autres formats** : Word, Excel, e-mails.
- [ ] **Multi-utilisateurs par entreprise** (rôles, partage de documents).
- [ ] **Export des réponses** (PDF, copier-coller enrichi).
- [ ] **Tableau de bord d'usage** (questions posées, documents les plus
      consultés).

---

## ✅ Fait

- [x] Authentification (inscription, connexion, JWT)
- [x] Import et indexation de PDF
- [x] Recherche vectorielle (pgvector)
- [x] Chat RAG avec réponses sourcées
- [x] LLM interchangeable (Ollama / Gemini / Groq)
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
- [x] Découpage du bundle frontend (react / recharts)
- [x] **Déploiement en ligne** — frontend Vercel, backend Railway (Docker),
      base Neon (pgvector) :
      [assistant-pme-teal.vercel.app](https://assistant-pme-teal.vercel.app)
