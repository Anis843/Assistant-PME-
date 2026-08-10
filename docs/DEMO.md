# Script de démonstration — NexIA (2 minutes)

Objectif : qu'une personne qui ne connaît rien au projet comprenne **le problème
résolu** en moins de deux minutes.

Règle d'or : **ne jamais improviser**. Répéter 3 fois avant d'enregistrer.

---

## ✅ Préparation (à faire AVANT d'enregistrer)

**On enregistre sur l'instance en ligne**, pas en local :
**https://assistant-pme-teal.vercel.app**

Une vraie URL prouve au prospect que le produit est utilisable aujourd'hui.
Un `localhost` dans la barre d'adresse dit l'inverse.

| # | Vérification |
|---|---|
| 1 | Ouvrir `/api/health` sur le backend → doit répondre `{"status":"ok"}` |
| 2 | **Réveiller le service 5 min avant** : se connecter et poser une question à blanc |
| 3 | Compte de démo connecté, avec 3-4 documents **déjà indexés** |
| 4 | Garder **un PDF de côté** (non importé) pour la démo d'upload en direct |
| 5 | Vérifier que la question prévue donne une bonne réponse **avant** d'enregistrer |
| 6 | Navigateur en plein écran, zoom 100 %, onglets personnels fermés |
| 7 | Notifications système coupées |
| 8 | Barre de favoris masquée (`Ctrl + Maj + B`) |

> ⚠️ Le point 2 est le plus important. Le serveur s'endort après une période
> d'inactivité : le premier accès peut prendre 30 s. C'est mortel en vidéo.

> ⚠️ Le point 3 aussi : des documents d'entreprise crédibles (contrat, facture,
> procédure). Un prospect PME ne se projette pas dans un document sans rapport
> avec son métier.

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
Quel est le préavis de résiliation du contrat de prestation ?
```

**Réponse attendue : 2 mois**, source `Contrat_prestation_AtlasDigital.pdf`.

> ⚠️ Ne pas poser « Quelles sont les conditions de résiliation ? » : le bail
> commercial y répond aussi (résiliation triennale). Deux sources remontent et
> la démonstration paraît imprécise. Nommer « contrat de prestation » dans la
> question suffit à lever l'ambiguïté.

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

## 📁 Le jeu de documents

Quatre documents d'entreprise, prêts dans `NexIA-demo-documents` :

| Document | Rôle dans la démo |
|---|---|
| `Bail_commercial_Petale_et_Co.pdf` | Pré-indexé |
| `Facture_FA-2026-0087_Cabinet_Mercier.pdf` | Pré-indexé |
| `Reglement_interieur_Groupe_Vertima.pdf` | Pré-indexé |
| `Contrat_prestation_AtlasDigital.pdf` | **Gardé pour l'upload en direct** |

Importer le contrat en direct puis l'interroger immédiatement est le moment le
plus convaincant de la démonstration : il prouve que le document devient
exploitable en quelques secondes.

---

## 💬 Questions de secours

Si la première réponse déçoit, enchaîner avec l'une de celles-ci. Toutes ont
été vérifiées : **une seule source, réponse nette**.

| Question | Réponse attendue | Source |
|---|---|---|
| « Quel est le montant TTC de la facture ? » | 1 944,00 € | Facture |
| « Combien de jours de télétravail sont autorisés ? » | 2 jours par semaine | Règlement intérieur |
| « Quel est le loyer mensuel du bail commercial ? » | 1 100 € HT (+ 150 € de charges) | Bail |
| « Combien de jours de congés payés par an ? » | 25 jours (+ 10 RTT) | Règlement intérieur |
| « Quel est le délai de livraison de la première version du site ? » | 6 semaines | Contrat |
| « Quel est le montant du dépôt de garantie ? » | 3 300 € | Bail |

### Questions à ne PAS poser

Elles remontent plusieurs documents et brouillent la démonstration :

- « Quelles sont les conditions de résiliation ? » → contrat **et** bail
- « Quelles sont les pénalités de retard ? » → contrat **et** facture
- « Quel est le montant ? » → les trois documents chiffrés

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

## 🔇 Version muette (recommandée)

Pas de voix off : le parcours à l'écran, et des textes ajoutés au montage.

La plupart des vidéos sont regardées **sans le son** sur LinkedIn : des textes
lisibles y portent le message mieux qu'une narration. Et une prise ne se
retourne plus parce qu'on a buté sur un mot — seul le parcours compte.

Contrepartie : **ralentir**. Laisser chaque texte 3 à 4 secondes à l'écran,
sinon il est illisible. Ménager des pauses là où on aurait parlé.

### Les textes, dans l'ordre

| Moment | Écran | Texte affiché |
|---|---|---|
| 0:00 | Landing | Les PME perdent des heures à chercher une information dans leurs documents. |
| 0:08 | Landing | NexIA répond à leur place. |
| 0:15 | Connexion | Chaque entreprise a son espace sécurisé. |
| 0:25 | Documents | J'importe un contrat. |
| 0:33 | Upload | Extraction, découpage, indexation — automatiques. |
| 0:42 | Statut « Indexé » | Le document est interrogeable. |
| 0:50 | Chat | Je pose ma question, en français. |
| 1:00 | *Réponse qui s'affiche* | *(aucun texte — laisser voir)* |
| 1:12 | Réponse | Réponse en quelques secondes. |
| 1:18 | **Bloc Sources** ⭐ | Et la source est citée. Rien n'est inventé. |
| 1:32 | Chat | Vos documents peuvent rester sur vos serveurs. |
| 1:45 | Fin | NexIA — vos documents, vos questions, vos réponses. |
| 1:52 | Fin | assistant-pme-teal.vercel.app |

> Le texte de 1:18 est le plus important de la vidéo. C'est la traçabilité qui
> distingue NexIA d'un chatbot, et ce qui rassure un avocat ou un comptable.
> Lui laisser 4 secondes pleines, avec le bloc Sources bien visible.

### Outils de montage

- **Clipchamp** — déjà installé sur Windows 11, suffisant pour des textes.
- **CapCut** — gratuit, plus rapide pour les sous-titres.

Pas de musique, pas de transitions, pas d'animation de titre. Un texte net sur
fond sombre, c'est tout ce qu'il faut.

---

## 🔁 Répétition (avant d'allumer la caméra)

Enchaîner le parcours complet **3 fois, chronomètre en main**, sans enregistrer :

```
Landing → Connexion → Documents → Upload → Indexé → Chat → Question → Sources
```

Objectif : le faire **sans notes, en moins de 2 minutes**. Tant que tu regardes
ce fichier pendant le parcours, tu n'es pas prêt à enregistrer.

Ce que la répétition sert à découvrir — et qu'on ne voit qu'en le faisant :
- combien de temps prend réellement l'indexation
- si la réponse à la question prévue est bonne **à tous les coups**
- où tu hésites (c'est là qu'il faudra couper au montage)

---

## 🎥 Enregistrement

- Outil : OBS Studio (gratuit) ou l'enregistreur intégré de Windows (`Win + G`).
- Format : 1920 × 1080, 30 fps.
- **3 à 4 prises complètes**, sans coupure, sans revisionner entre chaque.

> Ne cherche pas la prise parfaite au premier essai. Enchaîne les quatre, puis
> garde la meilleure. Revisionner entre deux prises fait perdre du temps et
> augmente la crispation — c'est ce qui s'entend le plus à l'écoute.

Une prise est bonne si : rien n'a planté, la réponse est correcte, et le bloc
Sources est visible. Le reste (une hésitation, un « euh ») se coupe au montage.

- Extraire aussi un GIF court (question → réponse → sources) pour le README.
