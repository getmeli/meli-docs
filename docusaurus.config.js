/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Meli Docs',
  tagline: 'Documentation of Meli, an open source platform for deploying static sites and frontend applications',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'getmeli',
  projectName: 'meli',
  themeConfig: {
    navbar: {
      title: 'meli docs',
      logo: {
        alt: 'meli-logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          href: 'https://github.com/getmeli/meli',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://twitter.com/getmeli/meli',
          label: 'Twitter',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/GgCYGjUvNx',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/getmeli',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/getmeli/meli',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Charlie Bravo`,
    },
  },
  presets: [
    ['@docusaurus/preset-classic', {
      docs: {
        routeBasePath: '/',
        sidebarPath: require.resolve('./sidebars.js'),
        editUrl: 'https://github.com/getmeli/meli-docs/edit/latest/',
      },
      theme: {
        customCss: require.resolve('./src/css/custom.css'),
      },
    }],
  ],
  plugins: [
    ['@cmfcmf/docusaurus-search-local', {
      indexDocs: true,
      docsRouteBasePath: '/',
    }],
  ],
};
