module.exports = {
  async rewrites() {
    return [
      {
        source: '/api',
        destination: 'http://localhost:4000/graphql',
      },
      {
        source: '/auth/:slug',
        destination: 'http://localhost:4000/auth/:slug',
      },
    ];
  },
  pageExtensions: ['page.tsx', 'api.ts'],
};
