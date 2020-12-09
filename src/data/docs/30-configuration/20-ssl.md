---
title: 'SSL'
excerpt: 'Learn how to configure SSL for Meli'
---

# SSL

Meli can obtain SSL certificates from a certification authority (CA) using the ACME protocol.

By default, it uses Let's Encrypt. If you want to use another CA, you must specify the following environment variables for Meli:

<div class="code-group">

```dotenv
# The URL to the ACME directory, here is an example 
# with the staging environment of Let's Encrypt:
MELI_ACME_SERVER=https://acme-staging-v02.api.letsencrypt.org/directory

# Optionaly, if using a private ACME server, you should specify:
MELI_ACME_CADDY_CA_PATH=<path to the CA certificate in the Caddy container>
```

</div>
