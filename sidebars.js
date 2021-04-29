module.exports = {
  docs: [
    'index',
    {
      type: 'category',
      label: 'Get started',
      items: [
        'get-started/installation',
        'get-started/upload-site',
        'get-started/branches',
        'get-started/single-page-applications',
        'get-started/pr-previews',
        'get-started/custom-headers',
        'get-started/forms',
        'get-started/upgrade-and-downgrade',
      ],
    },
    {
      type: 'category',
      label: 'Authentication',
      items: [
        'authentication/in-memory',
        'authentication/github',
        'authentication/gitlab',
        'authentication/gitea',
        'authentication/google',
      ],
    },
    {
      type: 'category',
      label: 'Branches',
      items: [
        'branches/redirects',
        'branches/password-protected-pages',
      ],
    },
    {
      type: 'category',
      label: 'Configuration',
      items: [
        'configuration/environment-reference',
        'configuration/ssl',
        'configuration/emails',
        'configuration/reverse-proxy',
      ],
    },
    {
      type: 'category',
      label: 'Core',
      items: [
        'core/permissions',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      items: [
        'integrations/webhooks',
        'integrations/slack',
        'integrations/mattermost',
        'integrations/email',
      ],
    },
    {
      type: 'category',
      label: 'API',
      items: [
        'api/get-started',
      ],
    },
    'faq',
  ],
};
