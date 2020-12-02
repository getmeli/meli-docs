import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';
import { createMetaImagePath } from 'utils';

const Seo = ({
  data: { title, excerpt, image, slug } = {},
  facebook,
} = {}) => {
  const {
    site: {
      siteMetadata: {
        siteTitle,
        siteDescription,
        siteUrl,
        siteImage,
        siteLanguage,
        authorTwitterAccount,
      },
    },
  } = useStaticQuery(graphql`
    query SEO {
      site {
        siteMetadata {
          siteTitle
          siteDescription
          siteUrl
          siteImage
          siteLanguage
          authorTwitterAccount
        }
      }
    }
  `);

  const currentTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const currentDescription = excerpt || siteDescription;
  const currentUrl = slug ? `${siteUrl}/${slug}` : siteUrl;
  const currentImage = createMetaImagePath(image, siteUrl, siteImage);

  return (
    <Helmet
      title={currentTitle}
      htmlAttributes={{
        lang: siteLanguage,
        prefix: 'og: http://ogp.me/ns#',
      }}
    >
      {/* General */}
      <meta name="description" content={currentDescription}/>
      {/* Open Graph */}
      <meta property="og:url" content={currentUrl}/>
      <meta property="og:title" content={currentTitle}/>
      <meta property="og:description" content={currentDescription}/>
      <meta property="og:image" content={currentImage}/>
      <meta property="og:type" content="website"/>
      {facebook && <meta property="fb:app_id" content={facebook.appId}/>}
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary"/>
      <meta name="twitter:creator" content={authorTwitterAccount}/>

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      <link rel="manifest" href="/site.webmanifest"/>
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000"/>
      <meta name="msapplication-TileColor" content="#ffffff"/>
      <meta name="theme-color" content="#ffffff"/>

      <script async src="https://analytics.charlie-bravo.be/ackee.js" data-ackee-server="https://analytics.charlie-bravo.be" data-ackee-domain-id="59a88bc5-2830-45c9-9781-a8b653f4f739"></script>

    </Helmet>
  );
};
export default Seo;
