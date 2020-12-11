---
title: 'SSL'
excerpt: 'Learn how to configure SSL for Meli'
---

# SSL

Meli is built on top of [Caddy](https://caddyserver.com/). Hence, it natively supports automatic SSL certificate issuance and renewal. By default, it uses LetsEncrypt, but Meli can obtain SSL certificates from a certification authority (CA) using the ACME protocol.

If you want to use another CA, you must specify the following environment variables for Meli:

<div class="code-group">

```dotenv
# The URL to the ACME directory, here is an example 
# with the staging environment of Let's Encrypt:
MELI_ACME_SERVER=https://acme-staging-v02.api.letsencrypt.org/directory

# Optionaly, if using a private ACME server, you should specify:
MELI_ACME_CADDY_CA_PATH=<path to the CA certificate in the Caddy container>
```

</div>

<div class="blockquote" data-props='{ "mod": "info" }'>

If you're having issues obtaining SSL certificates, you may want to clean the `/data` volume, which is where Caddy stores it's certificates. This allows you to start off clean.

</div>
