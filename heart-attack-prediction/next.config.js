/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  assetPrefix: '.',  // This helps with relative paths in CSS
  webpack: (config, { isServer }) => {
    // Add a rule to handle CSS
    const rules = config.module.rules;
    const cssRule = rules.find(rule => 
      rule.test && rule.test.toString().includes('.css')
    );
    
    if (cssRule) {
      console.log('CSS rule found and modified');
    }
    
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