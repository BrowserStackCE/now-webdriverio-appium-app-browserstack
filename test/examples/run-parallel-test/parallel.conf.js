exports.config = {
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  hostname: "hub.browserstack.com",
  port: 443,
  protocol: "https",

  services: [
    [
      "browserstack",
      {
        testObservability: true,
        testObservabilityOptions: {
          buildName: process.env.BROWSERSTACK_BUILD_NAME,
          buildTag: "run-bstack-now-app",
          buildIdentifier: "#${BUILD_NUMBER}",
        },
        percy: true,
        percyCaptureMode: "auto",
        accessibility: true,
        accessibilityOptions: {
          wcagVersion: "wcag21a",
          includeIssueType: {
            bestPractice: true,
            needsReview: true,
            experimental: false,
            advanced: false,
          },
        },
        buildIdentifier: "${BUILD_NUMBER}",
        browserstackLocal: true,
        opts: {
          force: true,
          localIdentifier: "browserstack-now-local",
        },
        "appium:app": process.env.BROWSERSTACK_APP
      },
    ],
  ],

  capabilities: JSON.parse(process.env.BSTACK_CAPS_JSON),

  commonCapabilities: {
    "bstack:options": {
      userName: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
      projectName: process.env.BROWSERSTACK_PROJECT_NAME,
      buildIdentifier: "#${BUILD_NUMBER}",
      buildName: process.env.BROWSERSTACK_BUILD_NAME,
      source: process.env.BROWSERSTACK_BUILD_NAME,
      networkLogs: "true",
      consoleLogs: "verbose",
      appProfiling: true,
      debug: "true"
    },
  },

  maxInstances: parseInt(process.env.BSTACK_PARALLELS) || 10,

  updateJob: false,
  specs: ["./specs/single_test.js"],
  exclude: [],

  logLevel: "info",
  coloredLogs: true,
  screenshotPath: "./errorShots/",
  baseUrl: "",
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    timeout: 240000,
  },
};

// Code to support common capabilities
exports.config.capabilities.forEach(function (caps) {
  for (let key in exports.config.commonCapabilities)
    caps[key] = { ...caps[key], ...exports.config.commonCapabilities[key] };
});
