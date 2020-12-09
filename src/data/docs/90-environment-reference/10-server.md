---
title: 'Server Environment Reference'
sidebarTitle: 'Server'
excerpt: 'Environment variables of Meli API'
---

# Server Environment Reference

## DEBUG

**Default**: undefined

**Required**: no

**Type**: string

**Description**:

Enable debug logs. We use the [debug](https://www.npmjs.com/package/debug) Npm package with scope `meli*`. To enable logs, use `DEBUG=meli*`.

## MELI\_PORT

**Default**: 3001

**Required**: yes

**Type**: number

**Description**:

The port on which Meli is listening.

## MELI\_URL

**Default**: undefined

**Required**: yes

**Type**: string

**Description**:

Public URL where Meli is served.

## MELI\_URL\_INTERNAL

**Default**: `MELI_URL`

**Required**: no

**Type**: string

**Description**:

Setting this variable only makes sense when Caddy is deployed as a standalone container. It sets the URL where the Meli API can be accessed internally. In local development, you would set this to `http://host.docker.internal:3001`. In a production `docker-compose.yml`, you would set it to something like `http://api` if your API container is named `api`.

## MELI\_UI\_URL

**Default**: `MELI_URL`

**Required**: no

**Type**: string

**Description**:

Public URL where the UI is served. Setting this variable makes sense when you are deploying the UI elsewhere than on `MELI_URL`.

## MELI\_UI\_URL\_INTERNAL

**Default**: `MELI_URL`

**Required**: no

**Type**: string

**Description**:

Setting this variable only makes sense when Caddy is deployed as a standalone container. It sets the URL where the Meli UI can be accessed internally. In local development, you would set this to `http://host.docker.internal:3000`. In a production `docker-compose.yml`, you would set it to something like `http://ui` if your UI container is named `ui`.

## MELI\_SITES\_URL

**Default**: `MELI_URL`

**Required**: no

**Type**: string

**Description**:

This is where your sites are served. 

## MELI\_STANDALONE

**Default**: false

**Required**: no

**Type**: boolean

**Description**:

When enabled, Meli will not configure the UI and API in Caddy. This variables only makes sense when you are deploying all containers separately.

## MELI\_UI\_DIR

**Default**: undefined

**Required**: no

**Type**: string

**Description**:

When set, the UI will be served from this path. Otherwise, it is reverse-proxied to `MELI_UI_URL_INTERNAL`.

## MELI\_JWT\_SECRET

**Default**: undefined

**Required**: yes

**Type**: string

**Description**:

Secret used to sign and verify JWT tokens. Can be generated with `openssl rand -hex 32`.

## MELI\_JWT\_TOKEN\_EXPIRATION

**Default**: 2592000000 (30 days)

**Required**: yes

**Type**: number

**Description**:

Expiration time (in ms) for JWT tokens.

## MELI\_GITLAB\_URL

**Default**: https://gitlab.com

**Required**: yes

**Type**: string

**Description**:

Your Gitlab URL.

## MELI\_GITLAB\_CLIENT\_ID

**Default**: undefined

**Required**: yes

**Type**: string

**Description**:

Your Gitlab app Client ID.

## MELI\_GITLAB\_CLIENT\_SECRET

**Default**: undefined

**Required**: yes

**Type**: string

**Description**:

Your Gitlab app Client Secret.

## MELI\_GITEA\_URL

**Default**: https://gitea.com

**Required**: yes

**Type**: string

**Description**:

Your Gitea URL.

## MELI\_GITLAB\_GROUPS

**Default**: undefined

**Required**: no

**Type**: array

**Description**:

Comma-separated list of Gitlab groups. Allows you to restrict login to only members of the given groups.

## MELI\_GITEA\_CLIENT\_ID

**Default**: undefined

**Required**: yes

**Type**: string

**Description**:

Your Gitea app Client ID.

## MELI\_GITEA\_CLIENT\_SECRET

**Default**: undefined

**Required**: yes

**Type**: string

**Description**:

Your Gitea app Client Secret.

## MELI\_GITEA\_ORGS

**Default**: undefined

**Required**: no

**Type**: array

**Description**:

Comma-separated list of Gitea organizations. Allows you to restrict login to only members of the given organizations.

## MELI\_GITHUB\_URL

**Default**: https://github.com

**Required**: yes

**Type**: string

**Description**:

Your Github URL.

## MELI\_GITHUB\_CLIENT\_ID

**Default**: undefined

**Required**: yes

**Type**: string

**Description**:

Your Github app Client ID.

## MELI\_GITHUB\_CLIENT\_SECRET

**Default**: undefined

**Required**: yes

**Type**: string

**Description**:

Your Github app Client Secret.

## MELI\_GITHUB\_ORGS

**Default**: undefined

**Required**: no

**Type**: array

**Description**:

Comma-separated list of Github organizations. Allows you to restrict login to only members of the given organizations.

## MELI\_GOOGLE\_CLIENT\_ID

**Default**: undefined

**Required**: no

**Type**: string

**Description**:

Your Google app Client ID.

## MELI\_GOOGLE\_CLIENT\_SECRET

**Default**: undefined

**Required**: no

**Type**: string

**Description**:

Your Google app Client Secret.

## MELI\_MONGO\_URI

**Default**: undefined

**Required**: yes

**Type**: string

**Description**:

URI of Mongo instance where Meli should store its data.

## MELI\_MIGRATE\_ROLLBACK

**Default**: false

**Required**: yes

**Type**: boolean

**Description**:

Forces the server to rollback the last migration, then exit. Use this when you're trying to [downgrade](/get-started/upgrade-and-downgrade).

## MELI\_COOKIE\_SAMESITE

**Default**: null

**Required**: yes

**Type**: string

**Description**:

Allows you to set the [SameSite](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite) property for cookies defined by the server. Useful when your Metroline server has a different host or URL than your UI.

## MELI\_COOKIE\_SECURE

**Default**: false

**Required**: yes

**Type**: boolean

**Description**:

Allows you to set the [Secure](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) property for cookies defined by the server. Some browsers, like Chrome, require it to be `true` to use cookies for cross site requests (which implies you need a secure backend).

## MELI\_RATE\_LIMIT\_WINDOW

**Default**: 60000

**Required**: yes

**Type**: number

**Description**:

Window size for rate limiting, in ms.

## MELI\_RATE\_LIMIT\_MAX\_PER\_WINDOW

**Default**: 100

**Required**: yes

**Type**: number

**Description**:

Max number of requests allows in the rate limiting window.

## MELI\_PROMETHEUS\_HOST

**Default**: localhost

**Required**: no

**Type**: string

**Description**:

Host where the Prometheus server should listen.

## MELI\_PROMETHEUS\_PORT

**Default**: 3002

**Required**: yes

**Type**: number

**Description**:

Port where the Prometheus server should listen.

## MELI\_PROMETHEUS\_REFRESH\_RATE

**Default**: 10000

**Required**: yes

**Type**: number

**Description**:

How often to refresh Prometheus metrics.

## MELI\_PROMETHEUS\_METRICS\_PREFIX

**Default**: meli_server_

**Required**: yes

**Type**: string

**Description**:

Prefix used for Prometheus metrics.

## MELI\_REDIS\_URL

**Default**: undefined

**Required**: no

**Type**: string

**Description**:

Redis URL for proxying websockets connections. This allows you to run multiple instance of the Meli API in parallel.

## MELI\_HOOK\_TIMEOUT

**Default**: 5000

**Required**: yes

**Type**: number

**Description**:

How much time hook requets should wait before failing.

## MELI\_MAIL\_HOST

**Default**: undefined

**Required**: no

**Type**: string

**Description**:

Mail host.

## MELI\_MAIL\_PORT

**Default**: undefined

**Required**: no

**Type**: number

**Description**:

Mail port.

## MELI\_MAIL\_USERNAME

**Default**: undefined

**Required**: no

**Type**: string

**Description**:

Mail username.

## MELI\_MAIL\_PASSWORD

**Default**: undefined

**Required**: no

**Type**: string

**Description**:

Mail password.

## MELI\_MAIL\_FROM

**Default**: undefined

**Required**: no

**Type**: string

**Description**:

Mail form. Some mail providers (like OVH) force this email to equal the mail username. 

## MELI\_MAIL\_SUBJECT\_PREFIX

**Default**: Meli |

**Required**: no

**Type**: string

**Description**:

Mail subject prefix.

## MELI\_MAIL\_TEMPLATE\_DIR

**Default**: ./emails/templates

**Required**: no

**Type**: string

**Description**:

Directory where mail templates can be found.

## MELI\_SENTRY\_ENABLED

**Default**: true

**Required**: yes

**Type**: boolean

**Description**:

Whether to enabled [Sentry](https://sentry.io/).

## MELI\_RESTRICTED\_IPS

**Default**: none

**Required**: no

**Type**: array

**Description**:

Hook URLs are resolved and checked against these restriected IPs.

<div class="blockquote" data-props='{ "mod": "info" }'>

Partially implemented, not yet working.

</div>

## MELI\_RESTRICTED\_DOMAINS

**Default**: none

**Required**: no

**Type**: array

**Description**:

<div class="blockquote" data-props='{ "mod": "info" }'>

Partially implemented, not yet working.

</div>

## MELI\_CADDY\_DIR

**Default**: /sites

**Required**: no

**Type**: string

**Description**:

Directory where Caddy looks for sites.

## MELI\_SITES\_DIR

**Default**: /sites

**Required**: no

**Type**: string

**Description**:

Directory where Meli stores sites.

## MELI\_CADDY\_ADMIN\_API\_URL

**Default**: http://localhost:2019

**Required**: yes

**Type**: string

**Description**:

Admin API of Caddy. If Caddy runs in a standalone container, make sure to expose the admin API as it listens to `localhost` by default.

## MELI\_TMP\_DIRECTORY

**Default**: /var/folders/ff/v59bv_992tz5yq0sg7gptp300000gn/T

**Required**: no

**Type**: string

**Description**:

Where uploaded files are stored before being processed.

## MELI\_STATIC\_DIR

**Default**: ./public

**Required**: no

**Type**: string

**Description**:

Where the Meli API serves static content. This is used to server generic pages such as a 404.html page.

## MELI\_INVITE\_EXPIRATION\_TIME

**Default**: 86400000

**Required**: no

**Type**: number

**Description**:

Amount of time (in ms) before an invitation expires.

## MELI\_BCRYPT\_SALTROUNDS

**Default**: 10

**Required**: no

**Type**: number

**Description**:

Number of salt rounds for hashing passwords with Bcrypt.

## MELI\_ACME\_SERVER

**Default**: undefined

**Required**: no

**Type**: string

**Description**:

The ACME server to use for obtaining SSL certificates. When this variable is not set, we use LetsEncrypt production environment. We recommend setting this variable to the [LetsEncrypt staging environment]()https://letsencrypt.org/docs/staging-environment/ when testing Meli. See [here](/configuration/ssl).

## MELI\_ACME\_CA\_PATH

**Default**: undefined

**Required**: no

**Type**: string

**Description**:

Allows you to tell Meli to generate self-signed certificates. This is the path to the CA certificate to use.

## MELI\_AXIOS\_TIMEOUT

**Default**: 10000

**Required**: no

**Type**: number

**Description**:

Timeout for HTTP calls made with Axios.

## MELI\_USER

**Default**: undefined

**Required**: no

**Type**: string

**Description**:

Username for in-memory authentication.

## MELI\_PASSWORD

**Default**: undefined

**Required**: no

**Type**: string

**Description**:

Password for in-memory authentication.

## MELI\_MAX\_ORGS

**Default**: 1

**Required**: no

**Type**: number

**Description**:

Maximum number of organizations that can be created on this Meli instance. Setting this value to `0` will disable the limit.
