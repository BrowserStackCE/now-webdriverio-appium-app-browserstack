exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',

  hostname: 'hub.browserstack.com',

  services: [
    [
      'browserstack',
      {
        percy: true,
        percyCaptureMode: "auto",
        accessibility: true,
        buildIdentifier: '${BUILD_NUMBER}',
        browserstackLocal: true,
        opts: { forcelocal: false, localIdentifier: "webdriverio-appium-app-browserstack-repo" },
        app: process.env.BROWSERSTACK_APP_PATH || 'bs://sample.app',
      }
    ]
  ],

  capabilities: require('./../../../../usage_file.json'),

  commonCapabilities: {
    'bstack:options': {
      projectName: "NOW-Mobile-Test",
      buildName: 'browserstack-build-mobile',
      debug: true,
      networkLogs: true,
      source: 'webdriverio:appium-sample-sdk:v1.0'
    }
  },

  maxInstances: parseInt(process.env.BSTACK_PARALLELS) || 10,

  updateJob: false,
  specs: [
    './specs/single_test.js'
  ],
  exclude: [],

  logLevel: 'info',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 40000
  }
};

// Code to support common capabilities
exports.config.capabilities.forEach(function(caps){
  for(let key in exports.config.commonCapabilities) 
    caps[key] = { ...caps[key], ...exports.config.commonCapabilities[key]};
});
