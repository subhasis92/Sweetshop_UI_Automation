const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://sweetshop.netlify.app/",
    pageLoadTimeout: 90000,
    specPattern: "cypress/e2e/specs/*.js",
    retries: { runMode: 1, openMode: 0 },
  },
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    configFile: "reporter-config.json",
  }
});
