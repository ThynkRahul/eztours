/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ["app", "components", "data"],
  },
};

module.exports = nextConfig;
