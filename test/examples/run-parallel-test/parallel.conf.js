exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || "BROWSERSTACK_USERNAME",
  key: process.env.BROWSERSTACK_ACCESS_KEY || "BROWSERSTACK_ACCESS_KEY",

  hostname: "hub.browserstack.com",

  services: [
    [
      "browserstack",
      {
        testObservability: true,
        testObservabilityOptions: {
          buildTag: "run-bstack-now-web",
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
          buildIdentifier: "${BUILD_NUMBER}",
          browserstackLocal: true,
          opts: {
            forcelocal: false,
            localIdentifier: "webdriverio-appium-app-browserstack-repo",
          },
          app: process.env.BROWSERSTACK_APP,
        },
      },
    ],
  ],

  capabilities: JSON.parse(process.env.BSTACK_CAPS_JSON),

  commonCapabilities: {
    "bstack:options": {
      projectName: "NOW-Mobile-Test",
      buildName: "browserstack-build-mobile",
      debug: true,
      networkLogs: true,
      source: "webdriverio:appium-sample-sdk:v1.0",
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
