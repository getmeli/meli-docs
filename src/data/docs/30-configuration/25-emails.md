---
title: 'Email configuration'
excerpt: 'Learn how to configure emails for Meli'
---

# Email

By default Meli prints emails to the console. However, you can configure email credentials to a proper email service as follows:

<div class="code-group">

```shell script
MELI_MAIL_FROM: noreply@meli.sh
MELI_MAIL_HOST: localhost
MELI_MAIL_PORT: 1025
MELI_MAIL_USERNAME: user
MELI_MAIL_PASSWORD: password
```

</div>

For development purposes, we use [Mailhog](https://github.com/mailhog/MailHog):

<div class="code-group" data-props='{ "lineNumbers": ["true"], "labels": [".env"] }'>

```dotenv
MELI_MAIL_FROM: noreply@meli.sh
MELI_MAIL_HOST: localhost
MELI_MAIL_PORT: 1025
```

</div>

<div class="code-group" data-props='{ "lineNumbers": ["true"], "labels": ["docker-compose.yml"] }'>

```yaml
version: "3"
services:
  mailhog:
    image: mailhog/mailhog
    ports:
      - 127.0.0.1:8025:8025
      - 127.0.0.1:1025:1025
```

</div>
