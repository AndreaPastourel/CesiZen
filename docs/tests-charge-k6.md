# Tests de charge de CesiZen avec k6

## Objectif

Les tests de charge servent à vérifier que l’API CesiZen reste disponible et suffisamment rapide lorsque plusieurs utilisateurs l’utilisent en même temps.

L’outil retenu est **k6**. Les scénarios sont écrits en JavaScript et peuvent être lancés facilement depuis PowerShell.

> Les résultats présentés dans ce document correspondent à un environnement local utilisant Docker Desktop et le serveur Symfony intégré. Ils constituent une référence locale et non une mesure définitive des performances d’une infrastructure de production.

## Emplacement des fichiers

Les fichiers sont placés à la racine du dépôt :

```text
tests/
└── performance/
    └── k6/
        ├── cesizen-api.js
        └── run-k6.ps1
```

- `cesizen-api.js` contient les scénarios, les requêtes et les contrôles k6.
- `run-k6.ps1` demande les paramètres nécessaires puis lance k6.

## Prérequis

Avant le lancement d’un test :

1. Docker Desktop doit être démarré.
2. Les conteneurs CesiZen doivent être actifs.
3. L’API doit répondre sur `http://localhost:8000`.
4. k6 doit être installé sur le poste.
5. Un compte de test actif doit exister.

Le compte utilisé pendant les essais est :

```text
charge-test@cesizen.local
```

Le mot de passe ne doit pas être enregistré dans le script ni ajouté au dépôt Git.

## Parcours testé

Chaque itération simule le parcours suivant :

1. Vérification de l’état de santé de l’API.
2. Consultation de la liste des ressources.
3. Récupération du slug d’une ressource.
4. Consultation du détail de cette ressource.
5. Connexion avec le compte de test.
6. Vérification de la présence du cookie JWT `AUTH_TOKEN`.
7. Consultation du profil connecté.
8. Consultation des émotions.
9. Consultation des types d’émotions.
10. Consultation du journal de l’utilisateur.

Les routes principales testées sont :

```text
GET  /monitor/health/run
GET  /api/ressources
GET  /api/ressource/{slug}
POST /api/login_check
GET  /api/me
GET  /api/emotions
GET  /api/types-emotions
GET  /api/journal
```

## Seuils de validation

Le test est considéré comme réussi lorsque :

| Indicateur | Seuil |
|---|---:|
| Contrôles réussis | plus de 99 % |
| Requêtes HTTP en échec | moins de 1 % |
| Temps de réponse p95 | moins de 1 000 ms |

Le p95 indique que 95 % des requêtes ont répondu dans un temps inférieur ou égal à la valeur affichée.

## Lancer le smoke test

Le smoke test utilise un seul utilisateur virtuel et une seule itération. Son objectif est de vérifier que le script et le parcours fonctionnent avant d’envoyer davantage de requêtes.

Depuis la racine du projet :

```powershell
powershell -ExecutionPolicy Bypass -File .\tests\performance\k6\run-k6.ps1 -Scenario smoke
```

Lorsque le script demande l’adresse de CesiZen, il faut conserver :

```text
http://localhost:8000
```

Il ne faut pas utiliser l’adresse du front, car k6 doit interroger directement l’API.

### Résultat obtenu

| Indicateur | Résultat |
|---|---:|
| Utilisateurs virtuels | 1 |
| Itérations | 1 |
| Requêtes HTTP | 8 |
| Contrôles réussis | 11 sur 11 |
| Requêtes en échec | 0 % |
| Temps de réponse p95 | 427,85 ms |

Le smoke test est validé.

## Lancer le test de charge

Le scénario `load` augmente progressivement la charge jusqu’à cinq utilisateurs virtuels. Il dure deux minutes et comporte trois étapes de montée, de maintien et de diminution de la charge.

```powershell
powershell -ExecutionPolicy Bypass -File .\tests\performance\k6\run-k6.ps1 -Scenario load
```

### Résultat obtenu

| Indicateur | Résultat |
|---|---:|
| Durée | 2 minutes |
| Utilisateurs virtuels maximum | 5 |
| Parcours terminés | 66 |
| Requêtes HTTP | 467 |
| Contrôles réussis | 603 sur 604, soit 99,83 % |
| Requêtes HTTP en échec | 1 sur 467, soit 0,21 % |
| Temps moyen | 110,58 ms |
| Temps médian | 31,25 ms |
| Temps p95 | 115,35 ms |
| Temps maximal observé | 6,53 s |

Une requête vers `/api/me` a échoué ponctuellement. Cette erreur reste sous le seuil maximal de 1 % défini dans le script.

Le test de charge est donc validé.

## Interprétation

L’API a supporté cinq utilisateurs simultanés pendant deux minutes tout en respectant les trois seuils définis.

La majorité des réponses est rapide : 95 % des requêtes ont répondu en moins de 115,35 ms. Un temps maximal isolé de 6,53 secondes a néanmoins été observé. Il pourra être surveillé lors de futurs essais, sans remettre en cause la validation actuelle.

## Bonnes pratiques

- Toujours commencer par le scénario `smoke`.
- Utiliser un compte réservé aux tests.
- Ne jamais écrire le mot de passe directement dans le fichier JavaScript.
- Vérifier que l’URL ciblée est celle de l’API.
- Surveiller Grafana et les ressources Docker pendant les tests plus importants.
- Ne pas lancer un test de charge sur une production sans autorisation.
- Conserver les résultats importants afin de pouvoir comparer les évolutions du projet.

## Conclusion

Les scénarios k6 permettent de valider automatiquement le fonctionnement des routes publiques, de l’authentification JWT et des routes privées de CesiZen. Le smoke test et le test de charge local ont tous les deux respecté les seuils attendus.
