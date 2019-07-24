# NEW DEAL FOUNDERS

## General
- PO: Luc Olivier
- CdP: Andresse Njeungoue
- dev: Andresse Njeungoue
- Dossier Drive:

## GCP
- project: https://console.cloud.google.com/home/dashboard?project=new-deal-founders

# Qu'est ce que c'est (technos)

Application web AppEngine / Python 2.7 / Flask / Angular / APIs Google (Admin SDK)

# Qu'est ce que ça fait

cf specs dans le dossier Drive.

# Installation

```bash
./tasks/setup.sh <path to Gcloud appengine sdk>
```

# Execution

```bash
source env/bin/activate
dev_appserver.py app.yaml
# ... then
deactivate
```

# Deploiement

```bash
./tasks/deploy.sh <dev|production|acceptance> <version>
```
