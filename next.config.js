/** @type {import('next/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  transpilePackages: ['three'],
  webpack: (config) => {
    // Enable loading of external JavaScript files
    config.resolve.extensions.push('.js');
    
    // Configure module rules for Three.js
    config.module.rules.push({
      test: /three\/examples\/jsm/,
      type: 'javascript/auto'
    });

    // Add fallback for fs module
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  }
}/
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  transpilePackages: ['three'],
  webpack: (config) => {
    // Enable loading of external JavaScript files
    config.resolve.extensions.push('.js');
    
    // Configure module rules for Three.js
    config.module.rules.push({
      test: /three/examples/jsm/,
      type: 'javascript/auto'
    });

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  }
}t('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  webpack: (config) => {
    // Enable loading of external JavaScript files
    config.resolve.extensions.push('.js');
    
    // Configure module rules for Three.js
    config.module.rules.push({
      test: /three\/examples\/jsm/,
      type: 'javascript/auto'
    });

    return config;
  }
}

module.exports = nextConfig