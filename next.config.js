/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
  },
  async rewrites() {
    // a static page in public/, reachable without its file name
    return [{ source: '/estimating-review', destination: '/estimating-review/index.html' }]
  },
}

module.exports = nextConfig
