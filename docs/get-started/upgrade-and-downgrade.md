---
title: 'Upgrade and downgrade'
description: ''
---

## Upgrade

```shell script
docker stop getmeli/api
docker pull getmeli/api
docker start getmeli/api
```

## Downgrading

Downgrading must be done **one version by one version**. For example, say you are using v1.1.0, and you want to downgrade to v1.0.0, you will have to:
- downgrade from 1.1.0 to 1.0.1
- downgrade from 1.0.1 to 1.0.0

For example, downgrading from 1.1.0 to 1.0.0:

```shell script
# stop server
docker stop meli-server
# backup volumes
cp -r /data/meli /data/meli.bak

# rollback migrations of 1.1.0
docker run --env-file .env --env MELI_MIGRATION_ROLLBACK=1 getmeli/api:1.1.0
# pull previous version (1.0.1)
docker pull getmeli/api:1.0.1

# rollback migrations of 1.0.1
docker run --env-file .env --env MELI_MIGRATION_ROLLBACK=1 getmeli/api:1.0.1
# pull previous version (1.0.0)
docker pull getmeli/api:1.0.0

# start normally
docker run --env-file .env getmeli/api:1.0.0
```
