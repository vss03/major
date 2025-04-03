/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'out',
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve 'fs', 'child_process' etc on the client to prevent errors
      config.resolve.fallback = {
        fs: false,
        child_process: false,
        net: false,
        tls: false,
        'python-shell': false,
      };
    }
    return config;
  },
};

module.exports = nextConfig; 