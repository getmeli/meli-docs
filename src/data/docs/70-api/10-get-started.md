---
title: 'API Get Started'
sidebarTitle: 'Get started'
excerpt: 'Get started with the Meli API'
---

# API

> API docs coming soon

## Authentication

1. Get your API token via the UI. You can:
    - specify activation/expiration dates 
    - limit access to specific endpoints

1. When making a request, send your token in the `token` query param or `X-Token` header

## Example

Here is a quick example for accessing the API to delete a site branch.

1. Create an API token

    <video controls>
      <source src="/media/create-api-token.mp4" type="video/mp4" />
    </video>

2. Create a `.env` file

    <div class="code-group">
    
    ```dotenv
    API_TOKEN=my-token
    ```
    
    </div>

3. Call the API

    <div class="code-group">
    
    ```js
    // load your .env and place it in process.env
    require('dotenv/config');
    
    const url = 'https://cloud.meli.sh';
    const siteId = 'b3a9c55d-d740-436f-84bb-03bdec6bf518';
    
    const axios = require('axios').create({
      baseURL: url,
      headers: {
        'X-Token': process.env.API_TOKEN,
      },
    });
    
    async function deleteBranch(name) {
      const { data } = await axios.get(`/api/v1/sites/${siteId}/branches`);
    
      const branch = data.find(branch => branch.name === name);
    
      if (!branch) {
        console.log('Branch not found');
        return;
      }
    
      await axios.delete(`/api/v1/sites/${siteId}/branches/${branch._id}`);
    }
    
    deleteBranch('demo').catch(console.error);
    ```
    
    </div>
