module.exports = {
  async rewrites() {
    return [
      {
        source: "/api",
        destination: "http://server:4000/graphql",
      },
      {
        source: "/auth/:slug",
        destination: "http://server:4000/auth/:slug",
      },
    ];
  },
  pageExtensions: ["page.tsx", "api.ts"],
};
