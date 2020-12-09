---
title: 'Branches'
excerpt: 'Deploy multiple versions of the same static site with Meli'
---

# Branches

Branches allow you to deploy multiple versions of the same site. Each branch is served as a static site from `<branch-slug>.<site-name>.<meli-sites-url>`.

For example, if your Meli is deployed at `https://meli.company.com`, a branch named `next` in a site named `site` branch will be available at `https://latest.site.meli.company.com`.  

## Main branch

The main branch of a site, which can be configured in your site **Settings** tab, is served from `<site-name>.<your-meli-sites-url>`.

For example, if your Meli is deployed at `https://meli.company.com`, the main branch of a site `site` will be served from `https://site.meli.company.com`.

## Redirects

Redirects allow you to add dynamic routing to your sites.

### File redirects

This redirect type allows you serve specific content at a given path. 

This is useful to create environment files for your frontend apps to fetch, serving a different env file for each branch.

### Reverse proxy redirects

This allows you to proxy any path to an arbitrary url.

This is useful for migrating old sites progressively: you can configure some pages to display the old version of your site.     
