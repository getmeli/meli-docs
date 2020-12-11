---
title: 'Gitea Authentication'
sidebarTitle: 'Gitea'
excerpt: 'Authenticating to Meli using Gitea'
---

# Gitea Authentication

In **Settings / Applications**, add an OAuth application with the following settings:

| Field | Value |
| ---- | ---- |
| Application name   | Metroline | 
| Authorization callback URL | `<meli-server-url>/auth/gitea/callback` |

Copy your **Client ID** and **Client secret**.

<div class="blockquote" data-props='{ "mod": "info" }'>

If you've changed [`REFRESH_TOKEN_EXPIRATION_TIME`](https://docs.gitea.io/en-us/config-cheat-sheet/#oauth2-oauth2) in your Gitea config, make sure to set `MELI_REFRESH_TOKEN_EXPIRATION_TIME` with that same value. We've opened [an issue](https://github.com/go-gitea/gitea/issues/12641) on their repo to improve this.

</div>

Now, you can update your `docker-compose.yml`:

<div class="code-group">

```yaml
# ...
services:
  # ...
  server:
    # ...
    environment:
      # ...
      MELI_GITEA_CLIENT_ID: <your-gitea-client-id>
      MELI_GITEA_CLIENT_SECRET: <your-gitea-client-secret>
      MELI_GITEA_URL: http://10.0.1.23:3003
      # restrict access to your Gitea organizations
      MELI_GITEA_ORGS: my-org-1,my-org-2
```

</div>
