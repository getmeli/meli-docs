---
title: 'Server Environment Reference'
sidebarTitle: 'Server'
excerpt: ''
---

# Server Environment Reference

## DEBUG

**Default**: none

**Type**: string

**Description**:

Enable debug using the popular [debug](https://www.npmjs.com/package/debug) Npm package. To limit logs to Metroline, use `DEBUG=metroline.server*`.

## METROLINE\_JWT\_SECRET

**Default**: none

**Type**: string

**Description**:

Secret used to sign and verify JWT tokens. Can be generated with `openssl rand 32 -hex`.

## METROLINE\_JWT\_TOKEN\_EXPIRATION

**Default**: 259200 (30 days)

**Type**: number

**Description**:

Expiration time (in seconds) of JWT tokens.

## METROLINE\_UI\_URL

**Default**: none

**Type**: string

**Description**:

URL of the Metroline UI.

## METROLINE\_MONGO\_URI

**Default**: none

**Type**: string

**Description**:

URI of a MongoDB instance.

## METROLINE\_GITLAB\_URL

**Default**: https://gitlab.com

**Type**: string

**Description**:

URL of your Gitlab instance

## METROLINE\_GITLAB\_CLIENT\_ID

**Default**: none

**Type**: string

**Description**:

Gitlab application ID (see [here](https://docs.gitlab.com/ee/integration/oauth_provider.html#adding-an-application-through-the-profile)).

## METROLINE\_GITLAB\_CLIENT\_SECRET

**Default**: none

**Type**: string

**Description**:

Gitlab application secret (see [here](https://docs.gitlab.com/ee/integration/oauth_provider.html#adding-an-application-through-the-profile)).

## METROLINE\_GITLAB\_WEBHOOK\_SSL\_VERIFY

**Default**: true

**Type**: boolean

**Description**:

Whether to enable [Gitlab webhook SSL verification](https://docs.gitlab.com/ee/user/project/integrations/webhooks.html#ssl-verification) for hooks created by Metroline.

## METROLINE\_GITEA\_URL

**Default**: none

**Type**: string

**Description**:

URL of your Gitea instance

## METROLINE\_GITEA\_CLIENT\_ID

**Default**: none

**Type**: string

**Description**:

Client ID of an OAuth app registered in your Gitea instance.

## METROLINE\_GITEA\_CLIENT\_SECRET

**Default**: none

**Type**: string

**Description**:

Client secret of an OAuth app registered in your Gitea instance.

## METROLINE\_GITHUB\_URL

**Default**: https://github.com

**Type**: string

**Description**:

URL of your Github instance.

## METROLINE\_GITHUB\_CLIENT\_ID

**Default**: none

**Type**: string

**Description**:

Client ID of a Github OAuth app.

## METROLINE\_GITHUB\_CLIENT\_SECRET

**Default**: none

**Type**: string

**Description**:

Client secret of a Github OAuth app.

## METROLINE\_GITHUB\_WEBHOOK\_SSL\_VERIFY

**Default**: true

**Type**: boolean

**Description**:

Whether your Github instance should verify the SSL certificate of Metroline when calling webhooks.

## METROLINE\_PORT

**Default**: 3000 (local development) / 80 (Dockerfile)

**Type**: number

**Description**:

Port on which metroline is listening.

## METROLINE\_HOST

**Default**: none

**Type**: string

**Description**:

Host of your metroline server. For example `metroline.company.com:3000`. You can include host and port, but it should not contain protocol as this is handled internally. This value is used for providing correct redirect URL when doing OAuth flows and should 

## METROLINE\_WEBHOOK\_HOST

**Default**: MELI_HOST

**Type**: string

**Description**:

Host used for building the webhook URL when setting up a repository. This is useful when you are working locally as you've probably set [`MELI_HOST`](#metroline_host) to `localhost`. When your Git server calls webhooks, `localhost` will point to itself. The solution is to set `MELI_WEBHOOK_HOST` to `host.docker.internal` (OS X) or to your IP.

## METROLINE\_MIGRATE\_ROLLBACK

**Default**: false

**Type**: boolean

**Description**:

Forces the server to rollback the last migration, then exit. Use this when you're trying to [downgrade](#/docs/core/upgrade-and-downgrade).

## METROLINE\_JOB\_TIMEOUT

**Default**: 86400

**Type**: number

**Description**:

How much time (in seconds) a job has to complete. The server automatically cancels jobs that haven't completed within this amount of time.

## METROLINE\_RUNNER\_SECRET

**Default**: none

**Type**: string

**Description**:

Secret that should be sent by runners to authenticate.

## METROLINE\_GLOBAL\_SECRETS

**Default**: none

**Type**: string

**Description**:

An array of global secrets, formatted as a one line JSON string. See [global secrets](/docs/ci-configuration/secrets.md#global-secrets). 

For example:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```dotenv
MELI_GLOBAL_SECRETS=[{"name":"test","value":"val"},{"name":"test2","value":"val","protectedBranchesOnly":true,"branches":["master"]}]
```

</div>

Each object of the array should have the following properties:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| name | string | true | Global secret name. Should match `/^[a-zA-Z_][a-zA-Z0-9_]*$/`. |
| value | string | true | Global secret value. |
| protectedBranchesOnly | boolean | false | Whether this secret should be available on protected branches. |

## METROLINE\_MAX\_JOBS\_PER\_PIPELINE

**Default**: 100

**Type**: number

**Description**:

Maximum number of jobs per pipeline. Indirectly, this determines the maximum numbr of job entries in your `.metroline.yml`.

## METROLINE\_SYNC\_INTERVAL

**Default**: 1800 (30 minutes)

**Type**: number

**Description**:

How often (in seconds) user repositories should be synchronized.

## METROLINE\_CLEAN\_JOBS\_INTERVAL

**Default**: 5

**Type**: number

**Description**:

How often (in seconds) we should check for jobs that need to be cancelled due to a timeout.

## METROLINE\_ORGS

**Default**: none

**Type**: string

**Description**:

A comma separated list of organization **names** (not ID !) to which login and repos should be limited. For example:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```dotenv
MELI_ORGS=octocat
```

</div>

## METROLINE\_SSL\_KEY

**Default**: none

**Type**: string

**Description**:

An SSL private key in PEM format. See [SSL](#/core/ssl).

## METROLINE\_SSL\_CERT

**Default**: none

**Type**: string

**Description**:

An SSL certificate in PEM format. See [SSL](#/core/ssl).

## METROLINE\_REQUIRE\_LOGIN\_FOR\_PUBLIC\_REPOS

**Default**: true

**Type**: boolean

**Description**:

When set to false, public repositories of your Git server will also be public in Metroline. This grants guests read-only access to pipelines, jobs and logs.

## METROLINE\_REFRESH\_TOKEN\_TASK\_PERIOD

**Default**: 10

**Type**: number

**Description**:

How often (in seconds) to check for tokens that need to be refreshed.

## METROLINE\_COOKIE\_SAMESITE

**Default**: null

**Type**: string

**Description**:

Allows you to set the [SameSite](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite) property for cookies defined by the server. Useful when your Metroline server has a different host or URL than your UI.

## METROLINE\_COOKIE\_SECURE

**Default**: false

**Type**: boolean

**Description**:

Allows you to set the [Secure](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) property for cookies defined by the server. Some browsers, like Chrome, require it to be `true` to use cookies for cross site requests (which implies you need a secure backend). 

## METROLINE\_COMMIT\_MESSAGE\_SKIP\_MARKER

**Default**: [skip ci],[ci skip]

**Type**: string

**Description**:

A comma-separated list of patterns Javascript regular expressions to match against commit messages. When a pattern matches, no pipeline is created. 
