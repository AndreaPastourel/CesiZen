# CESIZen — Supervision, alerting et sécurité

## Objectif

L’objectif de cette mise en place est de superviser l’application CESIZen, détecter rapidement les indisponibilités ou comportements suspects, et créer automatiquement des tickets Jira lorsqu’une anomalie importante est détectée.

---

## 1. Supervision Docker

L’application est exécutée avec Docker Compose.

Les principaux services sont :

- `db` : MySQL
- `back` : API Symfony
- `front` : React / Vite
- `prometheus` : collecte des métriques
- `cadvisor` : métriques des conteneurs Docker
- `grafana` : visualisation et alertes
- `blackbox` : vérification HTTP des services
- `loki` : centralisation des logs
- `alloy` : collecte et envoi des logs vers Loki

Des **healthchecks Docker** ont été ajoutés afin de vérifier l’état des services.

Exemples :

- MySQL : `mysqladmin ping`
- Symfony : endpoint `/monitor/health/run`
- Front : requête HTTP sur Nginx
- Prometheus : `/-/ready`
- Grafana : `/api/health`
- cAdvisor : `/healthz`

---

## 2. Supervision avec Prometheus et cAdvisor

Prometheus collecte les métriques de l’infrastructure.

cAdvisor permet notamment de suivre :

- CPU des conteneurs
- mémoire RAM
- trafic réseau
- présence / activité des services Docker

Ces données sont ensuite affichées dans Grafana.

---

## 3. Blackbox Exporter

Blackbox Exporter vérifie que les principaux services répondent correctement en HTTP.

Les cibles surveillées sont notamment :

- Front React
- API Symfony
- Prometheus
- Grafana

Exemple de métrique :

```promql
probe_success{job="blackbox-http"}
```

Une valeur `1` signifie que le service répond correctement.

Une valeur `0` signifie qu’il est indisponible.

Les temps de réponse sont également récupérés grâce à :

```promql
probe_duration_seconds
```

---

## 4. Dashboard Grafana

Un dashboard CESIZen a été créé afin de centraliser les informations importantes.

Il contient notamment :

- état du Front
- état de l’API
- état de Prometheus
- état de Grafana
- temps de réponse des services
- consommation CPU
- consommation mémoire
- activité réseau
- nombre de services Docker détectés

Une section **Sécurité — Honeypot** a également été ajoutée avec :

- nombre de tentatives sur les dernières 24 h
- évolution des tentatives dans le temps
- dernières tentatives détectées

Le dashboard est provisionné depuis :

```text
monitoring/grafana/dashboards/cesizen.json
```

---

## 5. Alertes Grafana

Plusieurs alertes ont été mises en place.

### Indisponibilité d’un service

Déclenchée lorsque :

```promql
probe_success{job="blackbox-http"} < 1
```

Labels utilisés :

```text
project = cesizen
severity = critical
type = availability
source = blackbox
```

### Temps de réponse élevé

Surveillance du Front et de l’API.

Exemple :

```promql
probe_duration_seconds{job="blackbox-http", service=~"front|api"}
```

Une alerte est déclenchée lorsque le temps de réponse dépasse le seuil défini.

Labels :

```text
project = cesizen
severity = warning
type = performance
source = blackbox
```

---

## 6. Intégration Jira

Grafana est relié à Jira grâce à un **Contact Point Jira**.

Lorsqu’une alerte correspond à la politique de notification, Grafana crée automatiquement un ticket dans le projet Jira CESIZen.

Exemples :

- service indisponible
- problème de performance
- tentative détectée par le honeypot

Cela permet de transformer automatiquement les alertes de supervision en tâches de suivi.

---

## 7. Ticketing automatique des CI GitHub

Un workflow GitHub Actions dédié surveille les résultats des workflows CI.

Il utilise `workflow_run` et surveille notamment :

- Back - API
- Back - Docker
- Front - Docker
- Front - E2E
- Front - Lighthouse
- Back - Quality
- Front - Quality
- Global - Secrets
- Back - Security
- Front - Security
- Global - SonarCloud
- Back - Tests
- Front - Tests
- Back - OWASP ZAP
- Front - OWASP ZAP

Fonctionnement :

- CI en échec → création d’un ticket Jira
- ticket déjà existant → ajout d’un commentaire, pas de doublon
- CI redevenue fonctionnelle → commentaire puis fermeture automatique du ticket
- CI réussie sans ticket existant → aucune action

Cela permet de garder Jira synchronisé avec les incidents CI.

---

## 8. Honeypot Symfony

Un honeypot applicatif léger a été ajouté sur l’API Symfony.

Routes surveillées :

```text
/wp-login.php
/phpmyadmin
/.env
/.git/config
```

Ces routes correspondent à des chemins souvent testés automatiquement par des scanners ou robots malveillants.

Lorsqu’une route est appelée :

1. Symfony détecte l’accès.
2. Le honeypot écrit un événement dans un channel Monolog dédié.
3. La réponse reste volontairement en `404 Not Found`.
4. L’événement est enregistré dans :

```text
/app/var/log/honeypot.log
```

Exemple de test :

```powershell
curl.exe -i http://localhost:8000/wp-login.php
```

La réponse attendue est :

```text
HTTP/1.1 404 Not Found
```

Le log contient notamment :

- le piège déclenché
- le chemin demandé
- la méthode HTTP

---

## 9. Monolog

Un channel dédié a été créé :

```yaml
channels:
  - honeypot
```

Avec un handler spécifique :

```yaml
honeypot:
    type: stream
    path: "%kernel.logs_dir%/honeypot.log"
    level: warning
    channels: ["honeypot"]
```

Le handler est configuré globalement afin de fonctionner aussi bien en développement qu’en production.

---

## 10. Loki et Grafana Alloy

Les logs du honeypot sont centralisés avec Loki.

Flux :

```text
Symfony
   ↓
honeypot.log
   ↓
Grafana Alloy
   ↓
Loki
   ↓
Grafana
```

Alloy surveille le fichier :

```text
/var/log/cesizen/honeypot.log
```

et envoie les événements vers :

```text
http://loki:3100/loki/api/v1/push
```

Dans Grafana, la datasource Loki permet ensuite d’interroger les logs.

Exemple :

```logql
{job="cesizen-honeypot"} |= "Honeypot triggered"
```

---

## 11. Alerte Honeypot

Une alerte Grafana détecte les nouveaux événements de sécurité.

Exemple de requête :

```logql
sum(
  count_over_time(
    {job="cesizen-honeypot"} |= "Honeypot triggered" [5m]
  )
)
```

Condition :

```text
IS ABOVE 0
```

Labels :

```text
project = cesizen
severity = critical
type = security
source = honeypot
```

Lorsqu’un honeypot est déclenché :

```text
Requête suspecte
      ↓
Symfony
      ↓
Monolog
      ↓
Alloy
      ↓
Loki
      ↓
Grafana Alerting
      ↓
Jira
```

Un ticket de sécurité peut donc être créé automatiquement.

---

## 12. Résultat

La supervision CESIZen permet maintenant de couvrir trois axes principaux :

### Disponibilité

Détection des services qui ne répondent plus grâce à Blackbox Exporter.

### Performance

Suivi des temps de réponse et des ressources Docker avec Prometheus et cAdvisor.

### Sécurité

Détection des accès suspects avec le honeypot, centralisation des logs dans Loki et création automatique d’incidents Jira.

L’ensemble permet d’avoir une chaîne de supervision complète et centralisée autour de Grafana.
