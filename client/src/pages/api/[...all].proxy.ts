// pages/api/[...catch_all_dev_api].js
import { createProxyMiddleware } from "http-proxy-middleware";

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = createProxyMiddleware({
  target: process.env.NODE_ENV === "production" ? "http://server:4000" : "http://localhost:4000",
  ws: true, // proxy websockets
  changeOrigin: true,
  pathRewrite: {
    "^/api/": "/",
  },
});

export default proxy;
