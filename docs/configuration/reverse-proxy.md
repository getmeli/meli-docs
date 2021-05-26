---
title: "Reverse Proxy"
description: ""
---

## Introduction

:::danger

The most simple use case is to deploy Meli on a single VPS, or have it co-exist with other containers on a VPS by giving it its own IP (failover). It will make your life a lot easier. In particular, it will save you the hassle of managing your SSL certificates. 

:::

:::caution

Branch SSL certificates are not supported at the moment because you would need to generate a wildcard certificate for each site. We will be fixing this soon. Custom domain SSL certificate management is also your responsibility.

:::

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

### Traefik

:::caution

Branches are not supported at the moment because you would need to generate a wildcard certificate for each site. We'll be fixing this soon.

:::

To deploy Meli behind a Traefik reverse proxy, you'll need to:
1. define a [DNS challenge](https://doc.traefik.io/traefik/user-guides/docker-compose/acme-dns/) certificate resolver
1. configure Traefik for Meli so that it generates wildcard certificates
1. disable Meli's default HTTPs configuration to delegate it to Traefik. This is done by setting `MELI_HTTPS_AUTO: "false"`.

Here is an example using the OVH DNS challenge provider:

```yaml
version: '3.7'
services:

  traefik:
    image: traefik:2.3
    container_name: traefik
    restart: unless-stopped
    command:
      - '--log.level=INFO'
      - '--api.dashboard=true'
      - '--accesslog=true'
      - '--providers.docker=true'
      - '--providers.docker.exposedbydefault=false'
      - '--entrypoints.websecure.address=:443'
      - '--entrypoints.web.address=:80'
      - '--entrypoints.web.http.redirections.entrypoint.to=websecure'
      - '--entrypoints.web.http.redirections.entrypoint.scheme=https'
      # DNS challenge resolver
      - '--certificatesresolvers.letsencrypt-dns.acme.email=info@domain.com'
      - '--certificatesresolvers.letsencrypt-dns.acme.storage=/letsencrypt-dns/acme-dns.json'
      - '--certificatesresolvers.letsencrypt-dns.acme.dnschallenge=true'
      - '--certificatesresolvers.letsencrypt-dns.acme.dnschallenge.provider=ovh'
      - '--certificatesresolvers.letsencrypt-dns.acme.dnschallenge.delaybeforecheck=0'
      - '--certificatesresolvers.letsencrypt-dns.acme.dnsChallenge.resolvers=1.1.1.1:53,8.8.8.8:53'
      # uncomment this during your tests to use LetsEncrypt staging server
      #- '--certificatesresolvers.letsencrypt-dns.acme.caServer=https://acme-staging-v02.api.letsencrypt.org/directory'
    env_file:
      # contains OVH environment variables (this is specific to your DNS challenge provider)
      - traefik.env
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /data/traefik/letsencrypt:/letsencrypt
      - /data/traefik/letsencrypt-dns:/letsencrypt-dns

  meli:
    image: getmeli/meli:beta
    environment:
      MELI_URL: https://meli.domain.com
      MELI_MONGO_URI: mongodb://meli_mongo:27017/meli
      MELI_HTTPS_AUTO: "false"
    env_file:
      - meli.env
    volumes:
      - /data/meli/sites:/sites
      - /data/meli/files:/files
      - /data/meli/caddy/data:/data
      - /data/meli/caddy/config:/config
    depends_on:
      - meli_mongo
    labels:
      - "traefik.enable=true"
      - "traefik.http.services.meli.loadbalancer.server.port=80"
      # use regex matching to route primary and subdomains here
      - "traefik.http.routers.meli.rule=HostRegexp(`meli.domain.com`, `{subdomain:.+}.meli.domain.com`)"
      # tell Traefik to generate a wildcard certificate for this domain
      - "traefik.http.routers.meli.tls.certresolver=letsencrypt-dns"
      - "traefik.http.routers.meli.tls.domains[0].main=meli.domain.com"
      - "traefik.http.routers.meli.tls.domains[0].sans=*.meli.domain.com"
      - "traefik.http.routers.meli.entrypoints=websecure"

  meli_mongo:
    image: mongo:4.2-bionic
    restart: unless-stopped
    volumes:
      - /data/meli/mongo:/data/db
```
