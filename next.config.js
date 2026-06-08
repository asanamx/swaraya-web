const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the workspace root to this app (multiple lockfiles exist in the repo).
  turbopack: {
    root: __dirname,
  },
  // Allow Emergent preview hosts to access dev resources (HMR, etc.)
  allowedDevOrigins: [
    'nextjs-swaraya.preview.emergentagent.com',
    'nextjs-swaraya.cluster-8.preview.emergentcf.cloud',
    '*.preview.emergentagent.com',
    '*.preview.emergentcf.cloud',
    '*.emergentagent.com',
  ],
};

module.exports = nextConfig;
