/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env: {
    apiBaseUrl: 'https://h3-proxy.services.quickpipes.io/team7',
  },
}

module.exports = nextConfig
