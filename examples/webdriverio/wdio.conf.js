const chromeModheader = require('chrome-modheader');
const firefoxModheader = require('firefox-modheader');

const drivers = {
  chrome: { version: '110.0.5481.77' },
  firefox: { version: '0.30.0' }
};
exports.config = {
  specs: ['./examples/webdriverio/specs/*.js'],
  exclude: [],
  maxInstances: 10,
  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        extensions: [chromeModheader.getEncodedExtension()]
      }
    },
    {
      browserName: 'firefox'
    }
  ],
  logLevel: 'info',
  bail: 0,
  baseUrl: 'https://modheader.com',
  waitforTimeout: 5000,
  services: [
    ['selenium-standalone', { logPath: 'logs', installArgs: { drivers }, args: { drivers } }],
    [
      'firefox-profile',
      {
        extensions: [firefoxModheader.getExtension()]
      }
    ]
  ],
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  }
};
