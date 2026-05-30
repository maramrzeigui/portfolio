# 🚀 Déployer mon portfolio sur Vercel (guide pas à pas)

Mon portfolio est prêt. Voici comment le mettre en ligne **gratuitement** et obtenir
un lien à envoyer aux entreprises (exemple : `https://maram-rzeigui.vercel.app`).

> Le portfolio se trouve dans le dossier :
> `Downloads/bento_profil-master/interactive-portfolio`

---

## ✅ Méthode recommandée : Vercel CLI (la plus rapide, sans GitHub)

### Étape 1 — Ouvrir le terminal dans le bon dossier
Ouvrez l'application **Terminal** (Mac) et collez :

```bash
cd ~/Downloads/bento_profil-master/interactive-portfolio
```

### Étape 2 — Se connecter à Vercel
```bash
npx vercel login
```
- Choisissez **« Continue with Email »** (ou GitHub/Google).
- Entrez votre email : `maramrzeigui14@gmail.com`
- Allez dans votre boîte mail, ouvrez l'email de Vercel et cliquez sur **Verify**.
- Revenez au terminal : la connexion est validée. ✅

> Si vous n'avez pas encore de compte, il sera **créé automatiquement** à cette étape.

### Étape 3 — Déployer en production
```bash
npx vercel --prod
```
Répondez aux questions ainsi :
| Question | Réponse |
|---|---|
| Set up and deploy ? | **Y** (Entrée) |
| Which scope ? | votre compte (Entrée) |
| Link to existing project ? | **N** |
| Project name ? | `maram-rzeigui` (ou Entrée) |
| In which directory is your code ? | **.** (Entrée) |
| Modify settings ? | **N** |

À la fin, Vercel affiche un lien du type :
**`https://maram-rzeigui.vercel.app`** → c'est le lien à envoyer aux entreprises ! 🎉

---

## 🔄 Mettre à jour le portfolio plus tard
Après avoir modifié des fichiers, relancez simplement :
```bash
cd ~/Downloads/bento_profil-master/interactive-portfolio
npx vercel --prod
```

---

## ✏️ Modifier le contenu du portfolio
Presque tout le texte (profil, projets, expériences, compétences, langues, contact)
se trouve dans **un seul fichier** :

```
src/data/cvData.ts
```

- **Changer le lien GitHub / LinkedIn** → bloc `social` en haut du fichier.
- **Ajouter votre photo** → déposez une image nommée `profile.jpg` dans le dossier
  `public/`. Elle remplacera automatiquement l'avatar « MR ».
- **Mettre à jour le CV téléchargeable** → remplacez le fichier
  `public/CV-Maram-Rzeigui.pdf`.

---

## 🌐 (Option) Nom de domaine personnalisé
Sur le tableau de bord Vercel → votre projet → **Settings → Domains**, vous pouvez
ajouter un domaine personnalisé (ex. `maram-rzeigui.com`) si vous en achetez un.
