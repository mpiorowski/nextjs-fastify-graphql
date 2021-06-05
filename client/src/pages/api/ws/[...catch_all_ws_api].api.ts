// pages/api/[...catch_all_dev_api].js
import { createProxyMiddleware } from "http-proxy-middleware";

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = createProxyMiddleware("/api/ws", {
  target: "http://localhost:4000",
  ws: true, // proxy websockets
  changeOrigin: true,
  secure: false,
  logLevel: "debug",
  pathRewrite: {
    "^/api/ws/": "",
  },
});

export default proxy;
