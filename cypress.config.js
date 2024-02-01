const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl:'https://testy-zadanie.zapisani.dev',
    includeShadowDom: true,
    chromeWebSecurity: true,
    supportFile: 'cypress/support/commands.js',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
