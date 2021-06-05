// pages/api/[...catch_all_dev_api].js
import { createProxyMiddleware } from "http-proxy-middleware";

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = createProxyMiddleware({
  target: "http://server:4000",
  changeOrigin: true,
  pathRewrite: {
    "^/api/proxy/": "",
  },
});

export default proxy;
