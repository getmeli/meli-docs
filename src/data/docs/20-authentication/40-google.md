---
title: 'Google Authentication'
sidebarTitle: 'Google'
excerpt: 'Authenticating to Meli using Google'
---

# Google Authentication

1. Create a new Google application.
1. Configure the OAuth consent screen
1. Create OAuth credentials
1. Get your client ID and client secret

Now, you can update your `docker-compose.yml`:

```
services:
  # ...
  server:
    # ...
    environment:
      # ...
      MELI_GOOGLE_CLIENT_ID: <your-google-oauth-app-client-id>
      MELI_GOOGLE_CLIENT_SECRET: <your-google-oauth-app-client-secret>
``` 
