/** @type {import('next').NextConfig} */
const { env } = require("./env-config");
const nextConfig = {
  experimental: {
    outputStandalone: true,
  },
  reactStrictMode: true,
  env,
};

module.exports = nextConfig;
