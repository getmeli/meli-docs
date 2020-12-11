---
title: 'Gitlab Authentication'
sidebarTitle: 'GitLab'
excerpt: 'Authenticating to Meli using Gitlab'
---

# Gitlab Authentication

From your Gitlab **admin area**, [add a new application](https://docs.gitlab.com/ee/integration/oauth_provider.html#adding-an-application-through-the-profile) with the following settings:

| Field | Value |
| ---- | ---- |
| Name   | Metroline | 
| Redirect URL | `<meli-server-url>/auth/gitlab/callback` |
| Trusted | true |
| Scopes | api |

After creating the application, Gitlab will give you both the **Client ID** and **Client Secret**, which they respectively name **Application ID** and **Application Secret**.

<div class="blockquote" data-props='{ "mod": "warning" }'>

You may need to check "Allow requests to the local network from web hooks and services" in **Admin / Settings / Network / Outbound requests** for webhooks to be sent to Metroline.

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
      MELI_GITLAB_CLIENT_ID: <your-gitlab-application-id>
      MELI_GITLAB_CLIENT_SECRET: <your-gitlab-application-secret>
      MELI_GITLAB_URL: http://10.0.1.23:3003
      # restrict access to your Gitlab group
      MELI_GITLAB_GROUPS: my-org-1,my-org-2
```

</div>
