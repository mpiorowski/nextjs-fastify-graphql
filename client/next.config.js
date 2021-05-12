module.exports = {
  async rewrites() {
    return [
      {
        source: '/api',
        destination: 'http://localhost:4000/graphql',
      },
    ];
  },
  pageExtensions: ['page.tsx', 'api.ts']
};
