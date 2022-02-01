---
title: 'Gitlab Authentication'
sidebar_label: 'GitLab'
description: 'Authenticating to Meli using Gitlab'
---

From your Gitlab **admin area**, [add a new application](https://docs.gitlab.com/ee/integration/oauth_provider.html#adding-an-application-through-the-profile) with the following settings:

| Field | Value |
| ---- | ---- |
| Name   | Meli | 
| Redirect URL | `<meli-server-url>/auth/gitlab/callback` |
| Trusted / Confidential | true |
| Scopes | read_api |

After creating the application, Gitlab will give you both the **Client ID** and **Client Secret**, which they respectively name **Application ID** and **Application Secret**.

:::caution

You may need to check "Allow requests to the local network from web hooks and services" in **Admin / Settings / Network / Outbound requests** for webhooks to be sent to Meli.

:::

Now, you can update your `docker-compose.yml`:

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
      MELI_GITLAB_URL: https://gitlab.com # Or the URL to your own Gitlab instance
      # restrict access to your Gitlab group
      MELI_GITLAB_GROUPS: my-org-1,my-org-2
```
