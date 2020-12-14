const queries = require('./src/utils/algolia');
const { getNodePath } = require('./src/utils/get-node-path');
const { nodeGqlQuery } = require('./src/utils/node-gql-query');
require('dotenv').config();

const plugins = [
  'gatsby-plugin-react-helmet',
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'images',
      path: `${__dirname}/src/images`,
    },
  },
  'gatsby-transformer-sharp',
  {
    resolve: 'gatsby-plugin-sharp',
    options: {
      defaultQuality: 85,
    },
  },
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: 'gatsby-starter-default',
      short_name: 'starter',
      start_url: '/',
      background_color: '#663399',
      theme_color: '#663399',
      display: 'minimal-ui',
      icon: 'src/images/favicon.png', // This path is relative to the root of the site.
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'data',
      path: `${__dirname}/src/data/`,
    },
  },
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [
        {
          resolve: 'gatsby-remark-prismjs',
          options: {
            showLineNumbers: true,
          },
        },
        {
          resolve: `gatsby-remark-autolink-headers`,
          options: {
            elements: [`h1`, `h2`, `h3`, `h4`, `h5`],
            icon: '<span class="anchor-handle">#</span>',
            className: 'header-link',
          },
        },
        {
          resolve: `gatsby-remark-images`,
        },
      ],
    },
  },
  {
    resolve: 'gatsby-plugin-svgr-svgo',
    options: {
      inlineSvgOptions: [
        {
          test: /\.inline.svg$/,
          svgoConfig: {
            plugins: [
              {
                removeViewBox: false,
              },
            ],
          },
        },
      ],
      urlSvgOptions: [
        {
          test: /\.svg$/,
          svgoConfig: {
            plugins: [
              {
                removeViewBox: false,
              },
            ],
          },
        },
      ],
    },
  },
  'gatsby-alias-imports',
  {
    resolve: 'gatsby-plugin-sass',
    options: {
      data:
        '@import "./src/styles/variables.scss" , "./src/styles/mixins.scss";',
    },
  },
];

if (
  process.env.ALGOLIA_ADMIN_KEY &&
  process.env.GATSBY_ALGOLIA_APP_ID &&
  process.env.GATSBY_ALGOLIA_SEARCH_ONLY_KEY
) {
  plugins.push({
    resolve: 'gatsby-plugin-algolia',
    options: {
      appId: process.env.GATSBY_ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_ADMIN_KEY,
      enablePartialUpdates: true,
      queries,
      chunkSize: 10000, // default: 1000
    },
  });
}

// https://www.gatsbyjs.com/plugins/gatsby-plugin-local-search/
plugins.push(
  {
    resolve: 'gatsby-plugin-local-search',
    options: {
      name: 'prod-en',
      engine: 'flexsearch',
      engineOptions: 'speed',
      query: nodeGqlQuery,
      ref: 'id',
      // Default: all fields
      // index: ['title', 'body'],
      // Default: all fields
      // store: ['id', 'path', 'title'],

      // Function used to map the result from the GraphQL query. This should
      // return an array of items to index in the form of flat objects
      // containing properties to index. The objects must contain the `ref`
      // field above (default: 'id'). This is required.
      normalizer: ({ data }) => data.allFile.nodes.map(({ id, relativeDirectory, children }) => {
        const child = children[0];
        const nodePath = getNodePath(relativeDirectory, child);
        return ({
          id: child.id,
          path: nodePath,
          title: child.frontmatter.title,
          sidebarTitle: child.sidebarTitle,
          excerpt: child.excerpt,
          // body: child.html,
          body: child.rawMarkdownBody,
        });
      }),
    },
  },
);

module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    siteTitle: 'Meli Docs', // <title>
    siteDescription:
      'Documentation of Meli, an open source platform for deploying static sites and frontend applications.',
    // pathPrefix: "",
    siteImage: '/images/social-preview.png',
    siteLanguage: 'en',
    siteUrl: process.env.GATSBY_SITE_URL,
    /* author */
    authorName: 'Charlie Bravo',
    authorTwitterAccount: '@getmeli',
  },
  plugins,
};
