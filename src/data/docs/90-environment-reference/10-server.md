---
title: 'Server Environment Reference'
sidebarTitle: 'Server'
excerpt: ''
---

# Server Environment Reference

## DEBUG

**Default**: undefined

**Required**: no

**Type**: string

**Description**:

Enable debug logs. We use the [debug](https://www.npmjs.com/package/debug) Npm package with scope `meli*`. To enable logs, use `DEBUG=meli*`.

## MELI_PORT

**Default**: 3001

**Required**: yes

**Type**: number

**Description**:

Secret used to sign and verify JWT tokens. Can be generated with `openssl rand -hex 32`.

## MELI_URL

**Default**: undefined

**Required**: yes

**Type**: string

**Description**:



## MELI_URL_INTERNAL

**Default**: null

**Required**: no

**Type**: string

**Description**:



## MELI_UI_URL

**Default**: null

**Required**: no

**Type**: string

**Description**:



## MELI_UI_URL_INTERNAL

**Default**: null

**Required**: no

**Type**: string

**Description**:



## MELI_SITES_URL

**Default**: null

**Required**: no

**Type**: string

**Description**:



## MELI_STANDALONE

**Default**: false

**Required**: no

**Type**: boolean

**Description**:



## MELI_UI_DIR

**Default**: undefined

**Required**: no

**Type**: string

**Description**:



## MELI_JWT_SECRET

**Default**: undefined

**Required**: yes

**Type**: string

**Description**:



## MELI_JWT_TOKEN_EXPIRATION

**Default**: 2592000

**Required**: yes

**Type**: number

**Description**:



## MELI_GITLAB_URL

**Default**: https://gitlab.com

**Required**: yes

**Type**: string

**Description**:



## MELI_GITLAB_CLIENT_ID

**Default**: undefined

**Required**: yes

**Type**: string

**Description**:



## MELI_GITLAB_CLIENT_SECRET

**Default**: undefined

**Required**: yes

**Type**: string

**Description**:



## MELI_GITEA_URL

**Default**: https://gitea.com

**Required**: yes

**Type**: string

**Description**:



## MELI_GITEA_CLIENT_ID

**Default**: undefined

**Required**: yes

**Type**: string

**Description**:



## MELI_GITEA_CLIENT_SECRET

**Default**: undefined

**Required**: yes

**Type**: string

**Description**:



## MELI_GITHUB_URL

**Default**: https://github.com

**Required**: yes

**Type**: string

**Description**:



## MELI_GITHUB_CLIENT_ID

**Default**: undefined

**Required**: yes

**Type**: string

**Description**:



## MELI_GITHUB_CLIENT_SECRET

**Default**: undefined

**Required**: yes

**Type**: string

**Description**:



## MELI_GOOGLE_CLIENT_ID

**Default**: undefined

**Required**: no

**Type**: string

**Description**:



## MELI_GOOGLE_CLIENT_SECRET

**Default**: undefined

**Required**: no

**Type**: string

**Description**:



## MELI_MONGO_URI

**Default**: undefined

**Required**: yes

**Type**: string

**Description**:



## MELI_MIGRATE_ROLLBACK

**Default**: false

**Required**: yes

**Type**: boolean

**Description**:



## MELI_GITHUB_ORGS

**Default**: undefined

**Required**: no

**Type**: array

**Description**:



## MELI_GITEA_ORGS

**Default**: undefined

**Required**: no

**Type**: array

**Description**:



## MELI_GITLAB_GROUPS

**Default**: undefined

**Required**: no

**Type**: array

**Description**:



## MELI_SSL_KEY

**Default**: undefined

**Required**: yes

**Type**: string

**Description**:



## MELI_SSL_CERT

**Default**: undefined

**Required**: yes

**Type**: string

**Description**:



## MELI_COOKIE_SAMESITE

**Default**: null

**Required**: yes

**Type**: string

**Description**:



## MELI_COOKIE_SECURE

**Default**: false

**Required**: yes

**Type**: boolean

**Description**:



## MELI_RATE_LIMIT_WINDOW

**Default**: 60000

**Required**: yes

**Type**: number

**Description**:



## MELI_RATE_LIMIT_MAX_PER_WINDOW

**Default**: 100

**Required**: yes

**Type**: number

**Description**:



## MELI_PROMETHEUS_HOST

**Default**: localhost

**Required**: no

**Type**: string

**Description**:



## MELI_PROMETHEUS_PORT

**Default**: 3002

**Required**: yes

**Type**: number

**Description**:



## MELI_PROMETHEUS_REFRESH_RATE

**Default**: 10000

**Required**: yes

**Type**: number

**Description**:



## MELI_PROMETHEUS_METRICS_PREFIX

**Default**: meli_server_

**Required**: yes

**Type**: string

**Description**:



## MELI_REDIS_URL

**Default**: undefined

**Required**: no

**Type**: string

**Description**:



## MELI_HOOK_TIMEOUT

**Default**: 5000

**Required**: yes

**Type**: number

**Description**:



## MELI_MAIL_HOST

**Default**: undefined

**Required**: no

**Type**: string

**Description**:



## MELI_MAIL_PORT

**Default**: undefined

**Required**: no

**Type**: number

**Description**:



## MELI_MAIL_USERNAME

**Default**: undefined

**Required**: no

**Type**: string

**Description**:



## MELI_MAIL_PASSWORD

**Default**: undefined

**Required**: no

**Type**: string

**Description**:



## MELI_MAIL_FROM

**Default**: undefined

**Required**: no

**Type**: string

**Description**:



## MELI_MAIL_SUBJECT_PREFIX

**Default**: Meli |

**Required**: no

**Type**: string

**Description**:



## MELI_MAIL_TEMPLATE_DIR

**Default**: /Users/geoffroy/dev/git/meli/meli/src/env/emails/templates

**Required**: no

**Type**: string

**Description**:



## MELI_SENTRY_ENABLED

**Default**: true

**Required**: yes

**Type**: boolean

**Description**:



## MELI_RESTRICTED_IPS

**Default**: none

**Required**: no

**Type**: array

**Description**:



## MELI_RESTRICTED_DOMAINS

**Default**: none

**Required**: no

**Type**: array

**Description**:



## MELI_CADDY_DOCKER

**Default**: true

**Required**: yes

**Type**: boolean

**Description**:



## MELI_CADDY_DIR

**Default**: /sites

**Required**: no

**Type**: string

**Description**:



## MELI_SITES_DIR

**Default**: /sites

**Required**: no

**Type**: string

**Description**:



## MELI_CADDY_ADMIN_API_URL

**Default**: http://localhost:2019

**Required**: yes

**Type**: string

**Description**:



## MELI_TMP_DIRECTORY

**Default**: /var/folders/ff/v59bv_992tz5yq0sg7gptp300000gn/T

**Required**: no

**Type**: string

**Description**:



## MELI_STATIC_DIR

**Default**: /Users/geoffroy/dev/git/meli/meli/src/env/public

**Required**: no

**Type**: string

**Description**:



## MELI_INVITE_EXPIRATION_TIME

**Default**: 86400000

**Required**: no

**Type**: number

**Description**:



## MELI_BCRYPT_SALTROUNDS

**Default**: 10

**Required**: no

**Type**: number

**Description**:



## MELI_ACME_SERVER

**Default**: undefined

**Required**: no

**Type**: string

**Description**:



## MELI_ACME_CA_PATH

**Default**: undefined

**Required**: no

**Type**: string

**Description**:



## MELI_AXIOS_TIMEOUT

**Default**: 10000

**Required**: no

**Type**: number

**Description**:



## MELI_USER

**Default**: undefined

**Required**: no

**Type**: string

**Description**:



## MELI_PASSWORD

**Default**: undefined

**Required**: no

**Type**: string

**Description**:



## MELI_MAX_ORGS

**Default**: 1

**Required**: no

**Type**: number

**Description**:
