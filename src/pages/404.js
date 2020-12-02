import React from 'react';
import {default as LayoutMain} from 'layouts/main';

const NotFoundPage = () => (
  <LayoutMain
    seoMetadata={{
      title: 'Not Found | Metroline',
      content: 'The page does not exist',
      slug: '/404',
    }}
  >
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist.</p>
  </LayoutMain>
);

export default NotFoundPage;
