# Gestion des offres d'emploi

## Description

Application web permettant de gérer des offres d'emploi.

L'application permet notamment de :

- Consulter les offres d'emploi.
- Ajouter une nouvelle offre.
- Modifier une offre existante.
- Supprimer une offre avec confirmation.
- Gérer les erreurs et les états de chargement.

## Technologies utilisées

- React : bibliothèque JavaScript pour construire l'interface utilisateur.
- Vite : outil de développement et de build.
- React Router : gestion de la navigation.
- Bootstrap : mise en forme de l'interface.
- JavaScript : langage de développement.
- npm : gestionnaire de dépendances.
- JSON-Server : outil qui permet de simuler une API REST
- Vitest : outil de test automatisé

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- Node.js.
- npm (installé automatiquement avec Node.js).

Pour vérifier les installations :
`node -v` et `npm -v`

### Installer les dépendances :

`npm install`

## Lancement du projet

Lancement du Json-server : `npx json-server db.json --port 3000`\
\
Lancement du serveur de développement : `npm run dev`\
\
Lancement des tests : `npx vitest run --environment jsdom `
