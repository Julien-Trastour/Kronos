import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Kronos Documentation',
  description: 'Documentation pour l\'API Kronos',
  lastUpdated: true,
  base: '/',
  themeConfig: {
    sidebar: {
      '/api/': [
        {
          text: 'API Kronos',
          items: [
            { text: 'Présentation', link: '/api/overview' },
            { text: 'Authentification', link: '/api/auth' },
            { text: 'Gestion des employés', link: '/api/employees' },
            { text: 'Gestion des rôles', link: '/api/roles' },
            { text: 'Gestion des agences', link: '/api/agencies' },
            { text: 'Gestion des équipes', link: '/api/teams' },
            { text: 'Exemples d\'utilisation', link: '/api/examples' },
          ]
        }
      ],
      '/guides/': [
        {
          text: 'Guides Utilisateur',
          items: [
            { text: 'Démarrage', link: '/guides/getting-started' },
            { text: 'Authentification & Tokens', link: '/guides/authentication' },
            { text: 'Bonnes Pratiques', link: '/guides/best-practices' }
          ]
        }
      ]
    },
    nav: [
      { text: 'Guide', link: '/guides/getting-started' },
      { text: 'API', link: '/api/overview' },
      { text: 'GitHub', link: 'https://github.com/Julien-Trastour/Kronos' }
    ]
  }
});
