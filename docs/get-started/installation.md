---
title: 'Installation'
description: ''
---

## Getting started

Requirements:
- a VPS
- Docker and Docker Compose (see [here](https://docs.docker.com/engine/install/ubuntu/#install-docker-engine) for how to install on Ubuntu)

### 1. Configure DNS

Configure DNS records to point to your VPS. You should configure **both** the **main** and **wildcard** domains. Assuming your VPS's IP is `1.2.3.4`:

```txt
meli.company.com IN A 1.2.3.4
*.meli.company.com IN A 1.2.3.4
```

:::info

Your cloud provider should have a user interface that allows you to configure DNS records.

:::

### 2. Deploy Meli on your VPS

1. Create a file named `docker-compose.yml` anywhere you want:

    ```yaml
    version: "3"
    
    services:
    
      meli:
        image: getmeli/meli:beta
        ports:
          - 80:80
          - 443:443
        environment:
          # no trailing slash !
          MELI_URL: https://meli.company.com
          MELI_MONGO_URI: mongodb://mongo:27017/meli
          # openssl rand -hex 32
          MELI_JWT_SECRET: changeMe
          # https://docs.meli.sh/authentication
          MELI_USER: user
          MELI_PASSWORD: changeMe
        volumes:
          - ./data/sites:/sites
          - ./data/files:/files
          - ./data/caddy/data:/data
          - ./data/caddy/config:/config
        depends_on:
          - mongo
    
      mongo:
        image: mongo:4.2-bionic
        restart: unless-stopped
        volumes:
          - ./data/mongo:/data/db
    ```
    
    :::info
    
    To prevent your users from creating organizations, we set `MELI_MAX_ORGS` to `1` by default. You can disable this by setting `MELI_MAX_ORGS=0`.
    
    :::
    
2. Run `docker-compose up -d`
3. Browse at `meli.company.com`, and you should see the login page

![Login Page](/img/docs/login-page.png)

:::info

Deploying behind a reverse proxy ? A bit more config is required for HTTPs. Checkout our guide
on [installing behind a Reverse Proxy](/configuration/reverse-proxy).

:::
