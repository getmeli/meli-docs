---
title: "Reverse Proxy"
excerpt: ""
---

# Deploy Behind a Reverse Proxy

## Introduction

Meli by default uses caddy's automatic HTTPS support to deploy with Let's Encrypt certificates for your configured domain, however deployment behind a reverse proxy is supported. Do note that Meli will not provision certificates for custom domains and you will need to configure your reverse proxy for it. We have assumed you have followed the [installation guide](/get-started/installation).

## Configure Meli

Following needs to be done in your `docker-compose.yml` file:

1. Make sure `MELI_URL` is set to have `https` as it's scheme
2. Change the ports
3. Add the environment variable `MELI_HTTPS_AUTO: 0` to stop automatic provisioning of SSL certificates

<div class="code-group">

```yaml
version: "3"

services:

    meli:
    image: getmeli/meli:beta
    ports:
        # change the host port to your liking
        - 8005:80
    environment:
        # no trailing slash !
        # make sure this is https://
        MELI_URL: https://meli.company.com
        MELI_MONGO_URI: mongodb://mongo:27017/meli
        # openssl rand -hex 32
        MELI_JWT_SECRET: changeMe
        # https://docs.meli.sh/authentication
        MELI_USER: user
        MELI_PASSWORD: changeMe
        # add this
        MELI_HTTPS_AUTO: 0
    volumes:
        - ./data/sites:/sites
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

</div>

## Wildcard Certificates from Let's Encrypt

Depending on your setup, you may choose to setup wildcard certificates from Let's Encrypt on your own. This can be done by using certbot:

<div class="code-group">

```shell
certbot certonly \
 --manual \
 --preferred-challenges dns-01 \
 --server https://acme-v02.api.letsencrypt.org/directory \
 -d '*.meli.yourdomain.com' -d 'meli.yourdomain.com'
```

</div>

Please change the domain names to reflect your setup.

<div class="blockquote" data-props='{ "mod": "info" }'>

Domains are enclosed within quotes to avoid shell errors.

</div>

Certbot will let you know that you need to setup `TXT` records with your DNS provider, and upon doing so your certificates will be generated. This process can also be automated using plugins. Check out [this](https://certbot.eff.org/docs/using.html#dns-plugins) page from Certbot docs to see if there is a compatible plugin for your DNS provider.

## Reverse Proxy Configuration

### Nginx

If you are deploying Meli to a server that is running Nginx, you may use the following configuration file as a starting point.

<div class="code-group">

```conf
server {
    listen 443 ssl;
    server_name *.meli.yourdomain.com;

    location / {
        proxy_pass http://localhost:8005; # change this port according to your setup
        proxy_set_header Host $host;
        proxy_request_buffering off;
    }

    # assuming you are using let's encrypt certificates
    ssl_certificate /etc/letsencrypt/live/meli.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/meli.yourdomain.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

server {
    listen 443 ssl;
    server_name meli.yourdomain.com;

    location / {
        proxy_pass http://localhost:8005; # change this port according to your setup
        proxy_set_header Host $host;
        proxy_request_buffering off;
    }

    # assuming you are using let's encrypt certificates
    ssl_certificate /etc/letsencrypt/live/meli.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/meli.yourdomain.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

server {
    if ($host = *.meli.yourdomain.com) {
        return 301 https://$host$request_uri;
    }


    listen 80;

    server_name *.meli.yourdomain.com;
    return 404;
}

server {
    if ($host = meli.yourdomain.com) {
        return 301 https://$host$request_uri;
    }


    listen 80;

    server_name meli.yourdomain.com;
    return 404;
}

```

</div>
