---
title: "Reverse Proxy"
description: ""
---

## Introduction

Meli by default uses Caddy's automatic HTTPS support to deploy with Let's Encrypt certificates for your configured domain. However, deployment behind a reverse proxy is supported, but you will need to handle SSL certificate issuance and renewal on your own - you will want to get a wildcard SSL certificate instead. We assume you have followed the [installation guide](/get-started/installation).

## Configure Meli

The following needs to be done in your `docker-compose.yml` file:

1. Make sure `MELI_URL` is set to have `https` as it's scheme
2. Change the ports
3. Add the environment variable `MELI_HTTPS_AUTO: 0` to stop automatic provisioning of SSL certificates

```yaml
version: "3"

services:
    
  meli:
  image: getmeli/meli:beta
  ports:
    # change the host port to your liking
    - 8005:80
  environment:
    # ...
    # add this
    MELI_HTTPS_AUTO: 0
```

## Wildcard Certificates from Let's Encrypt

Depending on your setup, you may choose to setup wildcard certificates from Let's Encrypt on your own. This can be done by using certbot:

```shell
certbot certonly \
 --manual \
 --preferred-challenges dns-01 \
 --server https://acme-v02.api.letsencrypt.org/directory \
 -d '*.meli.yourdomain.com' -d 'meli.yourdomain.com'
```

:::caution

You will also have to generate wildcard certificates for site branches. We plan to simplify this process.

::: 

Please change the domain names to reflect your setup.

:::info

Domains are enclosed within quotes to avoid shell errors.

:::

Certbot will let you know that you need to setup `TXT` records with your DNS provider, and upon doing so your certificates will be generated. This process can also be automated using plugins. Check out [this](https://certbot.eff.org/docs/using.html#dns-plugins) page from Certbot docs to see if there is a compatible plugin for your DNS provider.

## Reverse Proxy Configuration

### Nginx

If you are deploying Meli to a server that is running Nginx, you may use the following configuration file as a starting point.

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
