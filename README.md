# CESIZen — Guide d’installation

## 1. Présentation du projet

CESIZen est une application dédiée au bien-être, à la santé mentale et au suivi des émotions.

Le projet est organisé sous forme de dépôt unique contenant trois applications principales :

CesiZen_API      → API back-end Symfony
web-react        → Application web React
CesiZen_Mobile   → Application mobile React Native avec Expo

Le projet contient donc un back-end, un front web et une application mobile.

##2. Prérequis

Avant d’installer le projet, il faut disposer des outils suivants :

PHP 8.2 ou supérieur
Composer
Symfony CLI
MySQL ou MariaDB
Node.js
npm
Git
Expo Go sur téléphone ou un émulateur Android/iOS

Pour vérifier les installations :
php -v
composer -V
symfony -v
node -v
npm -v
git --version

## 3. Récupération du projet

Cloner le dépôt Git :
git clone git@github.com:AndreaPastourel/CesiZen.git

Puis entrer dans le dossier du projet :
cd CesiZen

Le dépôt doit contenir les dossiers suivants :
CesiZen_API
CesiZen_Mobile
web-react


## 4. Accéder au dossier de l’API

Depuis la racine du projet :
cd CesiZen_API

## 5. Installer les dépendances PHP

composer install
Si Composer indique qu’il manque des dépendances ou si le fichier composer.lock n’est pas à jour :
composer update

## 6. Configurer l’environnement

Créer ou vérifier le fichier .env.local dans le dossier CesiZen_API.

Exemple de configuration avec MySQL / Laragon :

APP_ENV=dev
APP_SECRET=change_me

DATABASE_URL="mysql://root:@127.0.0.1:3306/cesi_zen?serverVersion=8.0&charset=utf8mb4"

Adapter le nom de la base, l’utilisateur et le mot de passe selon l’environnement local.

## 7. Créer la base de données
php bin/console doctrine:database:create
8. Lancer les migrations
php bin/console doctrine:migrations:migrate
9. Charger les données de test
php bin/console doctrine:fixtures:load

Confirmer avec yes lorsque Symfony demande si la base peut être purgée.

## 10. Générer les clés JWT

Si les clés JWT ne sont pas encore présentes :

php bin/console lexik:jwt:generate-keypair

Les clés doivent être générées dans :

config/jwt/private.pem
config/jwt/public.pem

## 11. Lancer le serveur Symfony

Avec Symfony CLI :
symfony server:start

Ou avec le serveur PHP intégré :
php -S localhost:8000 -t public

L’API est disponible à l’adresse :
http://localhost:8000

Routes utiles :
POST /api/register
POST /api/login_check
POST /api/token/refresh
GET  /api/me
GET  /api/ressources
GET  /api/types-ressources
GET  /api/categories-ressources
GET  /api/emotions
GET  /api/types-emotions
GET  /api/journal
Installation du front web React

## 12. Accéder au dossier web

Depuis la racine du projet :

cd web-react

Ou depuis le dossier CesiZen_API :

cd ../web-react
13. Installer les dépendances Node
npm install
14. Configurer l’URL de l’API

Créer ou vérifier le fichier .env dans le dossier web-react.

Exemple :

VITE_API_URL=http://localhost:8000

L’URL doit pointer vers le serveur Symfony.

## 15. Lancer le front web

npm run dev

L’application web est généralement disponible à l’adresse :

http://localhost:5173
Installation de l’application mobile React Native / Expo
16. Accéder au dossier mobile

Depuis la racine du projet :
cd CesiZen_Mobile

Ou depuis le dossier web-react :
cd ../CesiZen_Mobile

L’application mobile est développée avec React Native et Expo.

## 17. Installer les dépendances Node

npm install

## 18. Configurer l’URL de l’API pour mobile

Sur mobile, il ne faut pas utiliser localhost, car localhost correspond au téléphone lui-même.

Il faut utiliser l’adresse IP locale du PC qui lance le serveur Symfony.

Exemple :
http://192.168.1.155:8000

Dans le fichier de configuration de l’application mobile, vérifier que l’URL de l’API pointe vers l’adresse IP du PC :

const API_URL = "http://192.168.1.155:8000";

L’ordinateur et le téléphone doivent être connectés au même réseau Wi-Fi.

## 19. Lancer l’application mobile

npx expo start

Ensuite, scanner le QR code avec l’application Expo Go ou lancer l’application sur un émulateur.

Comptes de test

Après chargement des fixtures, les comptes suivants sont disponibles.

Compte administrateur
Email : admin@cesizen.fr
Mot de passe : Password123!
Compte utilisateur
Email : alice@cesizen.fr
Mot de passe : Password123!

Autres comptes utilisateurs disponibles :

lucas@cesizen.fr
emma@cesizen.fr
hugo@cesizen.fr
chloe@cesizen.fr
nathan@cesizen.fr
manon@cesizen.fr

Tous utilisent le mot de passe :

Password123!
Tests

## 20. Préparer la base de test

Depuis le dossier CesiZen_API :

php bin/console doctrine:database:create --env=test --if-not-exists
php bin/console doctrine:migrations:migrate --env=test
php bin/console doctrine:fixtures:load --env=test

Si la base de test existe déjà mais contient des tables incorrectes :

php bin/console doctrine:database:drop --env=test --force
php bin/console doctrine:database:create --env=test
php bin/console doctrine:migrations:migrate --env=test
php bin/console doctrine:fixtures:load --env=test

## 21. Lancer les tests PHPUnit
php bin/phpunit

Les tests vérifient notamment :

L’inscription
La connexion
L’accès aux routes protégées
Les ressources
Les émotions
Les types d’émotions
Le journal émotionnel
Commandes utiles
Vider le cache Symfony

Depuis CesiZen_API :

php bin/console cache:clear
Recharger les fixtures
php bin/console doctrine:fixtures:load
Vérifier les routes disponibles
php bin/console debug:router
Vérifier les services Symfony
php bin/console debug:container
Lancer la commande de vérification des comptes inactifs
php bin/console app:check-inactive-users

Cette commande permet :

D’avertir les utilisateurs inactifs depuis plus de 2 mois
De désactiver les utilisateurs inactifs depuis plus de 3 mois
Ordre conseillé pour lancer tout le projet
Terminal 1 — API Symfony
cd CesiZen_API
symfony server:start

ou :

cd CesiZen_API
php -S localhost:8000 -t public
Terminal 2 — Front web React
cd web-react
npm run dev
Terminal 3 — Application mobile Expo
cd CesiZen_Mobile
npx expo start

Ensuite :

API Symfony : http://localhost:8000
Front web   : http://localhost:5173
Mobile      : Expo Go avec le QR code
Problèmes fréquents
Erreur : Could not open input file: bin/console

Cette erreur signifie que la commande Symfony a été lancée dans le mauvais dossier.

Il faut être dans :

CesiZen_API

et non dans :

web-react
CesiZen_Mobile
Erreur de connexion entre le mobile et l’API

Si l’application mobile ne parvient pas à contacter l’API, vérifier :

Le serveur Symfony est bien lancé
Le téléphone et le PC sont connectés au même Wi-Fi
L’URL de l’API utilise l’adresse IP du PC
Le pare-feu Windows ne bloque pas le port 8000

Exemple correct pour mobile :

http://192.168.1.155:8000

Exemple incorrect sur mobile :

http://localhost:8000
Les images ne s’affichent pas

Les chemins enregistrés en base doivent commencer par :

/uploads/profils/

ou :

/uploads/ressources/

Ils ne doivent pas commencer par :

file:///

Côté front web ou mobile, il faut ajouter l’URL du back devant le chemin de l’image.

Exemple :

const imageUrl = `${API_URL}${cheminImage}`;
Erreur JWT Token not found

Cette erreur signifie qu’une route protégée est appelée sans token.

Il faut envoyer le token dans le header :

Authorization: Bearer <token>
Erreur refresh token

Si le refresh token ne fonctionne pas, vérifier :

La route /api/token/refresh existe
Le firewall refresh est bien configuré dans security.yaml
La table refresh_tokens existe en base
Le front stocke bien le refresh_token après connexion

## Structure du dépôt
NOM_DU_DEPOT
│
├── CesiZen_API
│   ├── config
│   ├── migrations
│   ├── public
│   ├── src
│   ├── tests
│   ├── composer.json
│   └── .env
│
├── web-react
│   ├── src
│   ├── public
│   ├── package.json
│   └── .env
│
├── CesiZen_Mobile
│   ├── app
│   ├── src
│   ├── assets
│   ├── package.json
│   └── app.json
│
├── .gitignore
└── README.md

## Notes importantes

Le dossier CesiZen_API correspond à l’API Symfony principale.

Le dossier web-react correspond à l’application web React.

Le dossier CesiZen_Mobile correspond à l’application mobile React Native / Expo.

Les trois applications doivent être lancées séparément dans trois terminaux différents pour utiliser l’ensemble du projet en local.
