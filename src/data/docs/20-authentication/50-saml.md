---
title: 'SAML Authentication'
sidebarTitle: 'SAML'
excerpt: 'Authenticating to Meli using SAML'
---

# SAML Authentication

1. Create a new SAML client in your IdP (for example, Keycloak) and remember the issuer/client name.
1. Look at your IdP docs to find the corresponding endpoint (for keycloak it is `https://<my.keycloak.install>/auth/realms/<my.realm>/protocol/saml`)

Now, you can update your `docker-compose.yml`:

<div class="code-group">

```yaml
services:
  # ...
  server:
    # ...
    environment:
      # ...
      MELI_SAML_ENDPOINT: <the-full-url-to-your-saml-endpoint>
      MELI_SAML_ISSUER: <the-issuer-or-client-to-authenticate-as>
``` 

</div>
