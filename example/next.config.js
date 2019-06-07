require('dotenv').config();
const fs = require('fs');
const withPlugins = require('next-compose-plugins');
const typescript = require('@zeit/next-typescript');
const withSourceMaps = require('@zeit/next-source-maps')({
  devtool: 'hidden-source-map',
});
const { BugsnagSourceMapUploaderPlugin } = require('webpack-bugsnag-plugins');

const pkgContent = fs.readFileSync('./package.json');
const pkg = JSON.parse(pkgContent.toString('utf8'));

const nextConfig = {
  publicRuntimeConfig: {
    appVersion: pkg.version,
    bugsnagApiKey: process.env.BUGSNAG_API_KEY,
  },
  webpack(config, options) {
    const { dev, isServer, buildId } = options;

    if (!dev) {
      config.plugins.push(new BugsnagSourceMapUploaderPlugin({
        apiKey: process.env.BUGSNAG_API_KEY,
        appVersion: pkg.version,
        publicPath: isServer ? '.next/server/' : `${process.env.SITE_URL}/_next/`,
        overwrite: true,
      }));
    }

    return config;
  },
};

module.exports = withPlugins([
  [withSourceMaps],
  [typescript],
], nextConfig);
