---
title: 'Upload a site to Meli'
sitebarTitle: 'Upload a site'
excerpt: 'Learn how to upload a site to Meli'
---

# Upload a site to Meli

1. Login to Meli
1. Create a team
1. Create a site, say `my-site`
1. In `my-site`, go to the **Tokens** tab and copy a token
1. In `my-site`, go to the **Settings** tab, and copy the **Site ID**
1. Assuming your static site has been built into a directory named `public`, run:

    <div class="code-group">
    
    ```shell script
    npx @getmeli/cli upload \
        --url http://localhost:80 \
        --site <site-id> \
        --token <site-token> \
        --branch "latest" \
        ./public
    ```
    
    </div>
   
1. Your site is now live at `https://latest.my-site.meli.my-company.com` and `https://my-site.meli.my-company.com`
