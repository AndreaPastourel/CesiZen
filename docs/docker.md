# Documentation Docker – CesiZen

## Objectif

Docker permet de lancer l’ensemble du projet CesiZen dans un environnement homogène et reproductible.

L’architecture contient :

* un conteneur pour le **front React / Vite**
* un conteneur pour le **back Symfony**
* un conteneur pour la **base de données MySQL**
* un `docker-compose.yml` pour orchestrer l’ensemble

---

## Organisation du projet

```text
CesiZen/
├── CesiZen_API/
│   ├── Dockerfile
│   └── .dockerignore
│
├── web-react/
│   ├── Dockerfile
│   ├── .dockerignore
│   └── nginx.conf
│
├── CesiZen_Mobile/
├── docker-compose.yml
├── .env
└── .gitignore
```

---

## Back Symfony

Le back utilise Symfony 8 avec PHP 8.4.

Le Dockerfile est construit en plusieurs étapes.

### Installation des dépendances

Composer est utilisé pour installer les dépendances PHP définies dans :

```text
composer.json
composer.lock
symfony.lock
```

### Image d’exécution

L’image finale utilise :

```text
PHP 8.4 CLI
```

avec notamment les extensions :

```text
intl
pdo
pdo_mysql
zip
```

Symfony CLI est également intégré afin de lancer l’application avec :

```bash
symfony server:start
```

Le conteneur est exécuté avec un utilisateur non-root.

Le back est exposé sur le port :

```text
8000
```

---

## Front React / Vite

Le front est développé avec React et Vite.

Le Dockerfile utilise deux étapes.

### Build

Une image Node est utilisée pour installer les dépendances :

```bash
npm ci
```

puis générer le build de production :

```bash
npm run build
```

Vite génère alors les fichiers statiques dans :

```text
dist/
```

### Nginx

Une fois le build terminé, Node n’est plus nécessaire.

Les fichiers générés sont servis par **Nginx**, qui joue le rôle de serveur web.

Le principe est :

```text
React / Vite
↓
npm run build
↓
dist/
↓
Nginx
↓
Navigateur
```

Une image Nginx non-root est utilisée pour améliorer la sécurité du conteneur.

Le port interne utilisé est :

```text
8080
```

et il est exposé localement sur :

```text
3000
```

---

## React Router et Nginx

Le fichier :

```text
nginx.conf
```

contient notamment :

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

Cela permet aux routes React Router de fonctionner correctement après un rafraîchissement de page.

Par exemple :

```text
/admin/emotions
/profil
/login
```

sont redirigées vers `index.html`, puis React Router affiche la bonne page.

---

## Correction liée à Linux

Lors du build Docker, une erreur était provoquée par une différence de casse dans un import.

Le fichier était nommé :

```text
Api.ts
```

alors que l’import utilisait :

```text
api
```

Sous Windows, cela pouvait fonctionner malgré la différence de casse.

Docker utilisant un environnement Linux, les noms de fichiers sont sensibles à la casse.

Le fichier a donc été renommé afin d’utiliser une casse cohérente.

---

## Base de données

La base de données utilise :

```text
MySQL 8.4
```

Elle est lancée directement par Docker Compose.

Les données sont conservées dans un volume Docker afin de ne pas être perdues lorsque les conteneurs sont recréés.

---

## Variables d’environnement

Le `docker-compose.yml` utilise des variables de cette forme :

```yaml
MYSQL_DATABASE: ${MYSQL_DATABASE}
DATABASE_URL: ${DATABASE_URL}
```

En local, elles sont définies dans :

```text
.env
```

Le fichier `.env` contient les valeurs spécifiques à l’environnement local et ne doit pas être envoyé sur GitHub.

Il doit donc être présent dans :

```text
.gitignore
```

Les mêmes variables pourront ensuite être injectées depuis GitHub Actions avec des Secrets et Variables GitHub.

---

## Lancer l’environnement complet

Depuis la racine du projet :

```bash
docker compose up --build
```

Cette commande :

1. construit le back Symfony
2. construit le front React
3. lance MySQL
4. lance le back
5. lance le front

---

## Vérifier les conteneurs

```bash
docker compose ps
```

ou :

```bash
docker ps
```

---

## Accéder aux applications

Front :

```text
http://localhost:3000
```

Back :

```text
http://localhost:8000
```

---

## Consulter les logs

Front :

```bash
docker compose logs front
```

Back :

```bash
docker compose logs back
```

Base de données :

```bash
docker compose logs db
```

---

## Arrêter les conteneurs

Pour arrêter les services sans les supprimer :

```bash
docker compose stop
```

Pour arrêter et supprimer les conteneurs :

```bash
docker compose down
```

Les données MySQL restent conservées.

Pour supprimer également le volume MySQL :

```bash
docker compose down -v
```

Cette commande est à utiliser uniquement lorsqu’on souhaite repartir avec une base vide.

---

## Reconstruire les images

Après une modification du front ou du back :

```bash
docker compose up --build
```

Pour reconstruire complètement sans utiliser le cache :

```bash
docker compose build --no-cache
docker compose up
```

---

## Résultat

L’environnement complet CesiZen peut maintenant être lancé avec une seule commande :

```bash
docker compose up --build
```

Cette configuration facilite le développement, réduit les différences entre environnements et prépare le projet à une future intégration dans une pipeline CI/CD.
