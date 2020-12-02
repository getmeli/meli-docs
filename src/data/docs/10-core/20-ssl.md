---
title: 'SSL'
excerpt: ''
---

# SSL

## Metroline server

Set `MELI_SSL_KEY` and `MELI_SSL_CERT` with paths to your SSL key and certificate (in PEM format) respectively.

## Self signed certificates

Whether you're using a self-signed certificate for your Metroline runner and/or git server, the concept is the same: make sure `NODE_EXTRA_CA_CERTS` is set with a path to your CA certificate (PEM format) and is available in the environment **before** running Node.

If you're running locally, because `dotenv` is registered programmatically, setting `NODE_EXTRA_CA_CERTS` in your `.env` will not work as the HTTPS agent is initialized before Node has even evaluated the program.

As a last resort, you can (but we strongly advice against it) set `MELI_SSL_VERIFY=false` for runners to skip SSL verification.
