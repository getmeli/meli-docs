---
title: 'Upgrade and downgrade'
excerpt: ''
---

# Upgrade and downgrade

## Upgrade

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```shell script
docker stop getmeli/api
docker pull getmeli/api
docker start getmeli/api
```

</div>

## Downgrading

Downgrading must be done **one version by one version**. For example, say you are using v1.1.0, and you want to downgrade to v1.0.0, you will have to:
- downgrade from 1.1.0 to 1.0.1
- downgrade from 1.0.1 to 1.0.0

For example, downgrading from 1.1.0 to 1.0.0:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```shell script
# stop server
docker stop meli-server
# backup volumes
cp -r /data/meli /data/meli.bak

# downgrade to 1.0.1

# rollback migrations of 1.1.0
docker run --env-file .env --env MELI_MIGRATION_ROLLBACK=1 getmeli/api:1.1.0
# pull previous version (1.0.1)
docker pull getmeli/api:1.0.1

# downgrade to 1.0.0

# rollback migrations of 1.0.1
docker run --env-file .env --env MELI_MIGRATION_ROLLBACK=1 getmeli/api:1.0.1
# pull previous version (1.0.0)
docker pull getmeli/api:1.0.0

# start normally
docker run --env-file .env getmeli/api:1.0.0
```

</div>
