---
title: 'Upgrade and downgrade'
excerpt: ''
---

# Upgrade and downgrade

## Upgrade

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```shell script
docker stop metroline/server
docker pull metroline/server
docker start metroline/server
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
docker stop metroline_server
# backup volumes
cp -r /data/metroline /data/metroline.bak

# downgrade to 1.0.1

# rollback migrations of 1.1.0
docker run --env-file .env --env MELI_MIGRATION_ROLLBACK=1 metroline/server:1.1.0
# pull previous version (1.0.1)
docker pull metroline/server:1.0.1

# downgrade to 1.0.0

# rollback migrations of 1.0.1
docker run --env-file .env --env MELI_MIGRATION_ROLLBACK=1 metroline/server:1.0.1
# pull previous version (1.0.0)
docker pull metroline/server:1.0.0

# start normally
docker run --env-file .env metroline/server:1.0.0
```

</div>
