/** @type {import('next').NextConfig} */
const { env } = require('./env-config');
const nextConfig = {
    reactStrictMode: true,
    env,
};

module.exports = nextConfig;