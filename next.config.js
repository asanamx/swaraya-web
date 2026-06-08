const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the workspace root to this app (multiple lockfiles exist in the repo).
  turbopack: {
    root: __dirname,
  },
};

module.exports = nextConfig;
