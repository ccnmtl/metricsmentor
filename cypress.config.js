/* eslint-env node */

const { defineConfig } = require('cypress');

module.exports = defineConfig({
    component: {
        devServer: {
          framework: 'react',
          bundler: 'webpack',
        },
      },
    blockHosts: [
        '*googletagmanager.com',
        '*google-analytics.com',
        '*doubleclick.net',
    ],
    waitForAnimations: true,
    e2e: {
        // We've imported your old cypress plugins here.
        // You may want to clean this up later by importing these.
        setupNodeEvents(on, config) {
            return require('./cypress/plugins/index.js')(on, config);
        },
        baseUrl: 'http://localhost:8000',
    },
    viewportHeight: 1080,
    viewportWidth: 1920,
});