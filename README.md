README.md COMPLET

PROJET FINAL TWITTER ADONISJS

DESCRIPTION

Application web de type réseau social.

Fonctionnalités principales :

inscription utilisateur connexion utilisateur publication de tweets affichage des tweets like de tweets suivre utilisateurs profil utilisateur

Fonctionnalités avancées :

authentification sécurisée token d'accès gestion session front upload avatar utilisateur bannière profil relation user tweets TECHNOLOGIES AdonisJS Node.js TypeScript MySQL Edge (templates) Vite JavaScript frontend INSTALLATION

Cloner le projet

git clone https://github.com/ton-compte/projet-final-kda.git

Entrer dans le projet

cd projet-final-kda

dépendances de l'installateur

npm installer

Configurer l'environnement

Créer un fichier .env

HÔTE=127.0.0.1 PORT=3333 CLÉ_APP=ta_cle_app CONNEXION_DB=mysql HÔTE_MYSQL=127.0.0.1 PORT_MYSQL=3306 UTILISATEUR_MYSQL=root MOT_DE_PASSE_MYSQL= NOM_DB_MYSQL=twitter_clone

Migrations de Lancer

migration node ace:run

Serveur Lancer

npm run dev

STRUCTURE DU PROJET

start/routes.ts app/controllers app/models database/migrations resources/js resources/views public

API ROUTES

AUTH POST /api/auth/register POST /api/auth/login POST /api/auth/logout

RECHERCHE DE TWEETS /api/tweets ENVOYER /api/tweets ENVOYER /api/tweets/:id/like ENVOYER /api/tweets/:id/retweet

UTILISATEURS GET /api/users/:id POST /api/users/:id/follow

SEMETTEURS (TESTÉ PAR LES UTILISATEURS)

Utilisateur 1 Nom d'utilisateur : alex Adresse e-mail : alex@test.com Mot de passe : 123456

Utilisateur 2 Nom d'utilisateur : emery Adresse e-mail : emery@test.com Mot de passe : 123456

Utilisateur 3 Nom d'utilisateur : grace Adresse e-mail : grace@test.com Mot de passe : 123456

FONCTIONNALITÉS FRONT inscription dynamique connexion timeline tweets publication tweet téléchargement instantané avatar stockage session locale LIEN APPLICATION

Locale

http://localhost:3333

Production (à remplacer)

https://ton-app.com

LANCEMENT RAPIDE

npm install node ace migration:run npm run dev

TEST D'ADMINISTRATION COMPTE

Adresse électronique : admin@test.com Mot de passe : admin123

STRUCTURE REPO GITHUB CONSEILLÉE

/projet-final-kda /app /database /resources /start /public .env.example README.md package.json
