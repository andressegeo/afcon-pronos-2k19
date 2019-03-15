# AFCON 2K19 Pronos

## General
- CdP: Andresse Njeungoue
- dev: Andresse Njeungoue
- Dossier Drive: https://drive.google.com/drive/u/0/folders/1Khcp_gIlSocjNAhD36Rxcoda5jYrnUsL

## GCP
- project: https://console.cloud.google.com/home/dashboard?project=pronos-can-2019
- scope:
  - https://www.googleapis.com/auth/admin.directory.user.readonly
  - https://www.googleapis.com/auth/admin.directory.group.readonly

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
source venv/bin/activate
dev_appserver.py app.yaml ../dgc-worldcup-russia-2018-api/api.yaml dispatch.yaml
# ... then
deactivate
```

# Deploiement

```bash
./tasks/deploy.sh <dev|production|acceptance> <version>
```
