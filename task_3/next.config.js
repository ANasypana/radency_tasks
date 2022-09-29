// Core
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const { DuplicatesPlugin } = require('inspectpack/plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, {
    dev,
  }) => {
    if (!dev) {
      config.plugins.push(
          new DuplicatesPlugin({
            verbose: true,
            emitErrors: true,
          }),
      );
    }

    config.performance = {
      hints: 'warning',
      maxAssetSize: 250000,
      maxEntrypointSize: 250000,
    };

    return config;
  },
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: true,
  images: {
    disableStaticImages: false,
    domains: ['lectrum.io', 'placeimg.com', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  }
}

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...defaultConfig,
      ...nextConfig,
      compress: true,
    };
  }

  return {
    ...defaultConfig,
    ...nextConfig,
    compress: false,
  };
};
