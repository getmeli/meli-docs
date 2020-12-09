---
title: 'Installation'
excerpt: ''
---

# Installation

## Getting started

Configure DNS records to point to your Meli server:

<div class="code-group">

```txt
meli.company.com IN A 1.2.3.4
*.meli.company.com IN A 1.2.3.4
```

</div>

Deploy with `docker-compose`:

<div class="code-group">

```yaml
version: "3"

services:

  meli:
    image: tmp
    ports:
      - 80:80
      - 443:443
    environment:
      MELI_URL: https://meli.company.com
      MELI_MONGO_URI: mongodb://mongo:27017/meli
      # openssl rand -hex 32
      MELI_JWT_SECRET: changeMe
      # https://docs.meli.sh/authentication
      MELI_USER: user
      MELI_PASSWORD: changeMe
    volumes:
      - ./tmp/sites:/sites
      - ./tmp/caddy/data:/data
      - ./tmp/caddy/config:/config
    depends_on:
      - mongo

  mongo:
    image: mongo:4.2-bionic
    volumes:
      - ./data/mongo:/data/db
    ports:
      - 127.0.0.1:27017:27017
```

</div>

<div class="blockquote" data-props='{ "mod": "info" }'>

To prevent your users to create organizations, we set `MELI_MAX_ORGS` to `1` by default. You can disable this by setting `MELI_MAX_ORGS=0`.

</div>

## Next steps

- [Uploading sites](/get-started/upload-site)
- [Other authentication methods](/authentication)
- [Configure Emails](/configuration/emails)
