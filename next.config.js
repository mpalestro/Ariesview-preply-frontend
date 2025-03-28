/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  // Disable static optimization to force fresh renders
  staticPageGenerationTimeout: 0,
  async redirects() {
    return [
      {
        source: '/CustomerSuccess',
        destination: '/customer-success',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig;
