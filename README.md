# CESIZen — Guide d’installation
## 1. Présentation du projet

CESIZen est une application dédiée au bien-être, à la santé mentale et au suivi des émotions.

Le dépôt contient trois parties principales :
CesiZen_API      → API Symfony
web-react        → Application web React
CesiZen_Mobile   → Application mobile React Native / Expo

L’API gère les données et la sécurité. Le front web et l’application mobile consomment cette API.
Toutes les branches de développement ont été fusionnées sur la branche main.
L’installation du projet se fait donc directement depuis la branche main.

## 2. Prérequis

Avant de lancer le projet, il faut installer :

PHP 8.2 ou supérieur
Composer
Symfony CLI
MySQL ou MariaDB
Node.js
npm
Git
Expo Go sur téléphone ou un émulateur mobile

Commandes utiles pour vérifier les installations :

php -v
composer -V
symfony -v
node -v
npm -v
git --version

## 3. Récupérer le projet

Cloner le dépôt :
git clone git@github.com:AndreaPastourel/CesiZen.git

Entrer dans le dossier :
cd CesiZen

Vérifier que le projet est bien sur la branche main :
git branch

Si besoin, se placer sur main :
git switch main

Mettre à jour le projet :
git pull origin main

Le dépôt doit contenir :

CesiZen_API
web-react
CesiZen_Mobile
Installation de l’API Symfony

## 4. Installer les dépendances

Aller dans le dossier de l’API :
cd CesiZen_API

Installer les dépendances PHP :
composer install

Si nécessaire :
composer update

## 5. Configurer l’environnement

Créer ou vérifier le fichier .env.local dans CesiZen_API.
Exemple avec MySQL / Laragon :
APP_ENV=dev
APP_SECRET=change_me

DATABASE_URL="mysql://root:@127.0.0.1:3306/cesi_zen?serverVersion=8.0&charset=utf8mb4"

Adapter le nom de la base, l’utilisateur et le mot de passe selon l’environnement local.

## 6. Créer la base de données

php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
php bin/console doctrine:fixtures:load

Confirmer avec yes si Symfony demande de purger la base.

## 7. Générer les clés JWT

Si les clés JWT ne sont pas encore présentes :
php bin/console lexik:jwt:generate-keypair

Les clés sont générées dans :
config/jwt/private.pem
config/jwt/public.pem

## 8. Lancer l’API

Avec Symfony CLI :
symfony server:start

Ou avec le serveur PHP intégré :
php -S localhost:8000 -t public

L’API est disponible ici :

http://localhost:8000
Installation du front web React

## 9. Installer le front web

Depuis la racine du projet :
cd web-react
npm install

Créer ou vérifier le fichier .env :
VITE_API_URL=http://localhost:8000

Lancer le front web :
npm run dev

Le front est généralement disponible ici :
http://localhost:5173
Installation de l’application mobile

## 10. Installer l’application mobile

Depuis la racine du projet :
cd CesiZen_Mobile
npm install

Lancer Expo :
npx expo start

Scanner ensuite le QR code avec Expo Go ou lancer l’application sur un émulateur.

## 11. Configurer l’URL de l’API pour mobile

Sur mobile, il ne faut pas utiliser :
http://localhost:8000

car localhost correspond au téléphone.

Il faut utiliser l’adresse IP locale du PC :
http://192.168.1.155:8000

Exemple dans la configuration mobile :
const API_URL = "http://192.168.1.155:8000";

Le téléphone et le PC doivent être connectés au même réseau Wi-Fi.

## Comptes de test
### Administrateur
Email : admin@cesizen.fr
Mot de passe : Password123!
Utilisateur
Email : alice@cesizen.fr
Mot de passe : Password123!

### Autres comptes utilisateurs :

lucas@cesizen.fr
emma@cesizen.fr
hugo@cesizen.fr
chloe@cesizen.fr
nathan@cesizen.fr
manon@cesizen.fr

### Mot de passe commun :

Password123!
## Lancer les tests

Depuis le dossier CesiZen_API, préparer la base de test :

php bin/console doctrine:database:create --env=test --if-not-exists
php bin/console doctrine:migrations:migrate --env=test
php bin/console doctrine:fixtures:load --env=test

### Lancer les tests :

php bin/phpunit
## Lancer tout le projet

Ouvrir trois terminaux différents.

Terminal 1 — API Symfony
cd CesiZen_API
symfony server:start
Terminal 2 — Front web
cd web-react
npm run dev
Terminal 3 — Application mobile
cd CesiZen_Mobile
npx expo start

## Adresses utiles :

API Symfony : http://localhost:8000
Front web   : http://localhost:5173
Mobile      : Expo Go avec le QR code
Commandes utiles
Vider le cache Symfony
php bin/console cache:clear
Recharger les fixtures
php bin/console doctrine:fixtures:load
Afficher les routes
php bin/console debug:router
Lancer la vérification des comptes inactifs
php bin/console app:check-inactive-users

Cette commande permet d’avertir les utilisateurs inactifs depuis plus de 2 mois et de désactiver ceux inactifs depuis plus de 3 mois.

## Problèmes fréquents
### Erreur : Could not open input file: bin/console

La commande a été lancée dans le mauvais dossier.

Il faut être dans :

CesiZen_API

et non dans :

web-react
CesiZen_Mobile
###Le mobile ne contacte pas l’API

Vérifier que :

Le serveur Symfony est lancé
Le téléphone et le PC sont sur le même Wi-Fi
L’URL utilise l’adresse IP du PC
Le pare-feu ne bloque pas le port 8000

Exemple correct :

http://192.168.1.155:8000

Exemple incorrect sur mobile :

http://localhost:8000
### Erreur JWT Token not found

Une route protégée est appelée sans token.

Il faut envoyer le token dans le header :

Authorization: Bearer <token>
Les images ne s’affichent pas

Les chemins en base doivent commencer par :

/uploads/profils/

ou :

/uploads/ressources/

### Côté front ou mobile, ajouter l’URL de l’API devant le chemin de l’image :

const imageUrl = `${API_URL}${cheminImage}`;
Structure du dépôt
CesiZen
│
├── CesiZen_API
├── web-react
├── CesiZen_Mobile
├── .gitignore
└── README.md
