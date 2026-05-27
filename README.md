README.md COMPLET

PROJET FINAL TWITTER ADONISJS

DESCRIPTION

Application web type réseau social.

Fonctionnalités principales :

inscription utilisateur
connexion utilisateur
publication de tweets
affichage des tweets
like de tweets
follow utilisateurs
profil utilisateur

Fonctionnalités avancées :

authentification sécurisée
token d’accès
gestion session front
upload avatar utilisateur
bannière profil
relation user tweets
TECHNOLOGIES
AdonisJS
Node.js
TypeScript
MySQL
Edge (templates)
Vite
JavaScript frontend
INSTALLATION

Cloner le projet

git clone https://github.com/ton-compte/projet-final-kda.git

Entrer dans le projet

cd projet-final-kda

Installer dépendances

npm install

Configurer environnement

Créer fichier .env

HOST=127.0.0.1
PORT=3333
APP_KEY=ta_cle_app
DB_CONNECTION=mysql
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DB_NAME=twitter_clone

Lancer migrations

node ace migration:run

Lancer serveur

npm run dev

STRUCTURE DU PROJET

start/routes.ts
app/controllers
app/models
database/migrations
resources/js
resources/views
public

ROUTES API

AUTH
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout

TWEETS
GET /api/tweets
POST /api/tweets
POST /api/tweets/:id/like
POST /api/tweets/:id/retweet

USERS
GET /api/users/:id
POST /api/users/:id/follow

SEEDERS (UTILISATEURS TEST)

Utilisateur 1
username: alex
email: alex@test.com
password: 123456

Utilisateur 2
username: emery
email: emery@test.com
password: 123456

Utilisateur 3
username: grace
email: grace@test.com
password: 123456

FONCTIONNALITÉS FRONT
inscription dynamique
login
timeline tweets
publication tweet instantanée
upload avatar
stockage local session
LIEN APPLICATION

Local

http://localhost:3333

Production (à remplacer)

https://ton-app.com

LANCEMENT RAPIDE

npm install
node ace migration:run
npm run dev

COMPTE ADMIN TEST

email: admin@test.com
password: admin123

STRUCTURE REPO GITHUB CONSEILLÉE

/projet-final-kda
/app
/database
/resources
/start
/public
.env.example
README.md
package.json
