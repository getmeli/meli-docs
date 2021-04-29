---
title: 'Webhooks'
description: 'Configure webhooks with Meli'
---

## Creating a webhook

1. Go to one of your sites
1. Go to the "Hooks" tab
1. Click "Add"
1. Select type "Web"
1. Fill in the destination and add a secret (use `openssl rand -hex 32`)
1. Save the secret somewhere safe, your **consumer** application will need it

## Consuming webhooks

Webhooks are delivered with a `X-Webhook-Signature` header computed as an HMAC using `sha256`.

To verify the integrity of a webhook:
1. compute the signature of the request **raw body** using an HMAC with `sha256` and the webhook secret
1. verify that the computed signature equals the `X-Webhook-Signature` header content

Reference NodeJS TypeScript implementation:

```ts
import { createHmac } from 'crypto';

async function verifyWebhookSignature(req: Request, secret: string): Promise<boolean> {
  const signature = req.header('X-Webhook-Signature');
  const { rawBody } = req as any;
  if (!signature || !rawBody || !Buffer.isBuffer(rawBody)) {
    return false;
  }
  const hmac = createHmac('sha256', secret)
    .update(rawBody)
    .digest()
    .toString('hex');
  return hmac === signature;
}
```

In ExpressJS, the raw body of a request can be obtained as follows:

```js
app.use(json({
    verify: (req: any, res, buf) => {
      // for performance, only do this when needed
      if (Buffer.isBuffer(buf) && req.header('X-Webhook-Signature')) {
        // store raw body for signature verification
        req.rawBody = buf;
      }
      return true;
    },
}));
```

## Example ExpressJS application

```js
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const createHmac = require('crypto').createHmac;

function signBody(payload, secret) {
  return createHmac('sha256', secret)
    .update(payload)
    .digest()
    .toString('hex');
}

function verifyWebhookSignature(req, secret) {
  const signature = req.header('X-Webhook-Signature');
  const { rawBody } = req;
  if (!signature || !rawBody || !Buffer.isBuffer(rawBody)) {
    return false;
  }
  return signBody(rawBody, secret) === signature;
}

const app = express();

app.use(bodyParser.json({
  verify: (req, res, buf) => {
    // for performance, only do this when needed
    if (Buffer.isBuffer(buf) && req.header('X-Webhook-Signature')) {
      // store raw body for signature verification
      req.rawBody = buf;
    }
    return true;
  },
}));

app.post('/', (req, res) => {
  const isValid = verifyWebhookSignature(req, process.env.WEBHOOK_SECRET);

  if (!isValid) {
    res.status(400).send({
      message: 'signature is invalid',
    });
    return;
  }

  res.status(204).send();

  console.log(JSON.stringify(req.body, null, 2));
});

const port = 8000;
app.listen(port, () => console.log(`Listening on ${port}`));
```
