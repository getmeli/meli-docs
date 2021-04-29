---
title: 'Branches'
description: 'Deploy multiple versions of the same static site with Meli'
---

## Introduction

Branches allow you to deploy multiple versions of the same site. Each branch is served as a static site from `<branch-slug>.<site-name>.<meli-sites-url>`.

For example, if your Meli is deployed at `https://meli.company.com`, a branch named `next` in a site named `site` branch will be available at `https://next.site.meli.company.com`.  

## Main branch

The main branch of a site, which can be configured in your site **Settings** tab, is served from `<site-name>.<your-meli-sites-url>`.

For example, if your Meli is deployed at `https://meli.company.com`, the main branch of a site `site` will be served from `https://site.meli.company.com`.

## Read further

- [Redirects](/branches/redirects)
- [Protect your pages with passwords](/branches/password-protected-pages)
