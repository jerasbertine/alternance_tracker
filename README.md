# AlternanceTracker

Suivi de candidatures d'alternance : centraliser ses dossiers, ne pas perdre le fil des relances, et garder une vue claire sur son pipeline de l'envoi jusqu'à la signature.

**Démo en ligne :** [altracker.vercel.app](https://altracker.vercel.app)

<!-- ![Dashboard AlternanceTracker](./public/screenshot-dashboard.png) -->

## Pourquoi ce projet

Un tableur ou une boîte mail ne suffisent pas à suivre une dizaine de candidatures en parallèle : on perd de vue qui relancer, à quel stade en est chaque dossier, et depuis combien de temps une entreprise n'a pas répondu. AlternanceTracker répond à ce besoin avec un tableau de bord type kanban, un statut dédié aux relances, et une fiche par candidature.

C'est aussi un projet d'apprentissage : après un parcours Laravel/Vue (Epitech, ESGI), l'objectif était de prendre en main React, Next.js (App Router) et TypeScript sur un cas d'usage réel, plutôt que sur des exercices isolés.

## Fonctionnalités

- **Authentification** (Clerk) — inscription, connexion, session par utilisateur
- **CRUD complet** des candidatures : créer, consulter, modifier, supprimer
- **Kanban par statut** : à postuler, envoyée, relance, entretien, refusée, acceptée
- **Fiche dossier** par candidature (entreprise, poste, dates, lien de l'offre, notes)
- **Statistiques** en un coup d'œil : dossiers ouverts, taux de réponse, entretiens, relances dues
- **Tri** par date de création
- **Responsive** : sidebar desktop, menu mobile sur petit écran
- Chaque candidature est strictement rattachée à son propriétaire — vérifié côté serveur sur chaque lecture/écriture, pas seulement à l'affichage

## Stack technique

| Domaine | Choix |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Server Components, Server Actions) |
| Langage | TypeScript |
| UI | Tailwind CSS v4, [shadcn/ui](https://ui.shadcn.com) |
| Authentification | [Clerk](https://clerk.com) |
| Base de données | [Neon](https://neon.com) (PostgreSQL serverless) |
| ORM | [Drizzle ORM](https://orm.drizzle.team) |
| Validation | [Zod](https://zod.dev) |
| Déploiement | [Vercel](https://vercel.com) |

### Pourquoi ces choix

- **Next.js App Router plutôt que du Laravel classique** : l'occasion de comprendre un modèle où un composant peut interroger la base directement côté serveur, sans construire d'API intermédiaire — une vraie différence d'architecture, pas seulement de syntaxe.
- **Server Actions plutôt qu'une API REST séparée** : pour un CRUD simple avec formulaires, une fonction `"use server"` appelée directement depuis un `<form action={...}>` évite la couche `fetch`/routes API que Next.js permettrait aussi de construire.
- **Drizzle plutôt que Prisma** : un ORM plus proche du SQL (les requêtes ressemblent à du SQL composé en TypeScript), un typage dérivé du schéma sans étape de génération séparée, et un runtime plus léger — adapté à un déploiement serverless sur Neon.
- **Clerk plutôt qu'une auth maison** : s'appuyer sur un service audité pour un domaine à haut risque sécurité (hashing, sessions, tokens) plutôt que le réimplémenter.

## Structure du projet

```
app/
  page.tsx                    accueil (marketing)
  sign-in/, sign-up/          pages Clerk
  dashboard/
    page.tsx                  kanban + stats + création rapide
    actions.ts                Server Actions (create/update/delete)
    loading.tsx                état de chargement
    [id]/page.tsx              fiche dossier (lecture)
    [id]/edit/page.tsx         édition d'une candidature
components/
  ui/                          composants shadcn/ui
  dashboard-sidebar.tsx        navigation (desktop + menu mobile)
  status-badge.tsx             badge coloré par statut
db/
  schema.ts                    schéma Drizzle (table candidatures)
  index.ts                     client de connexion Neon
lib/
  statuts.ts                   source unique de vérité des statuts
```

## Lancer le projet en local

### Prérequis

- Node.js 20+
- Un compte [Clerk](https://clerk.com) (clés API)
- Un compte [Neon](https://neon.com) (base PostgreSQL)

### Installation

```bash
git clone https://github.com/jerasbertine/alternance_tracker.git
cd alternance_tracker
npm install
```

### Variables d'environnement

Créer un fichier `.env.local` à la racine :

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
DATABASE_URL=
```

### Base de données

```bash
npx drizzle-kit generate   # génère les migrations SQL à partir du schéma
npx drizzle-kit migrate    # les applique sur la base Neon
```

### Démarrer le serveur de dev

```bash
npm run dev
```

L'application est disponible sur [http://localhost:3000](http://localhost:3000).
