---
title: 'Email configuration'
sidebarTitle: 'Emails'
excerpt: 'Learn how to configure emails for Meli'
---

# Emails

By default Meli prints emails to the console. However, you can configure email credentials to a proper email service as follows:

<div class="code-group">

```shell script
MELI_MAIL_FROM: noreply@meli.sh
MELI_MAIL_HOST: smtp.company.com
MELI_MAIL_PORT: 1025
MELI_MAIL_USERNAME: user
MELI_MAIL_PASSWORD: password
```

</div>

For development purposes, we use [Mailhog](https://github.com/mailhog/MailHog):

<div class="code-group" data-props='{ "labels": ["docker-compose.yml"] }'>

```yaml
version: "3"
services:
  # ...
  meli:
    # ...
    environment:
      MELI_MAIL_FROM: noreply@meli.sh
      MELI_MAIL_HOST: mailhog
      MELI_MAIL_PORT: 1025
  mailhog:
    image: mailhog/mailhog
    ports:
      - 127.0.0.1:8025:8025
      - 127.0.0.1:1025:1025
```

</div>
