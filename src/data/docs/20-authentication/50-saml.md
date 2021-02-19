---
title: 'SAML Authentication'
sidebarTitle: 'SAML'
excerpt: 'Authenticating to Meli using SAML'
---

# SAML Authentication

**Warning:** Make sure to setup your private/public keys, or else SAML login will be insecure.

1. Create a new SAML client in your IdP (for example, Keycloak) and remember the issuer/client name.
1. Look at your IdP docs to find the corresponding endpoint (for keycloak it is `https://<my.keycloak.install>/auth/realms/<my.realm>/protocol/saml`)
1. Look at your IdP docs to find your SAML certificate (for keycloak you can get it at `https://<my.keycloak.install>/auth/realms/<my.realm>/protocol/saml/descriptor`)
1. Generate an RSA private/public keypair to use for signing requests, and configure your IdP with the public key.

For information on how to format the certificate and key, see [the upstream passport-saml documentation](https://github.com/node-saml/passport-saml#security-and-signatures).

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
      MELI_SAML_IDP_CRT: <the-public-cert-of-your-IdP>
      MELI_SAML_PRIVATE_CRT: <an-RSA-private-key>
``` 

</div>
