---
title: 'Upload a site to Meli'
sitebarTitle: 'Upload a site'
excerpt: 'Learn how to upload a site to Meli'
---

# Upload a site to Meli

1. In the UI, create a site, say `my-site`
1. In `my-site`, go to the **Tokens** tab and copy a token
1. In `my-site`, go to the **Settings** tab, and copy the **Site ID**
1. Assuming your static site has been built into a directory named `public`, run:

    <div class="code-group">
    
    ```shell script
    npx @getmeli/cli upload \
       ./public \
        --url http://localhost:80 \
        --site <site-id> \
        --token <site-token> \
        --branch "latest"
    ```
    
    </div>
   
1. Your site is now live at `https://latest.my-site.meli.my-company.com` and `https://my-site.meli.my-company.com`
1. Point your domain to the site in meli. If you are pointing `sub.domain.com` to a meli site, you can add a `CNAME` DNS record to point `sub.domain.com` to `my-site.meli.my-company.com`. If you are pointing a primary domain (`domain.com`), you have to create a DNS `A` record ppointing to the **IP** where Meli serves your sites.

## Github Actions

Add a repository secret named `MELI_TOKEN` with a Meli token for your site, then update your build workflow:

<div class="code-group">

```yaml
name: main
on: [ push ]
env:
  MELI_SITE: "6d09389c-5cb7-4839-ba4b-a0ff75c12851"
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: '12'
      - name: "build"
        run: |
          npm ci
          npm run build
      - name: "publish"
        run: |
          npx @getmeli/cli upload \
            --url "https://meli.my-company.com" \
            --site "$MELI_SITE" \
            --token "$MELI_TOKEN" \
            --release "$GITHUB_SHA" \
            ./public
        env:
          MELI_TOKEN: ${{ secrets.MELI_TOKEN }}
```

</div>
