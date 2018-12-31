const {Builder, By, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const fs = require('fs')
require('chromedriver');
require('geckodriver');

function encode(file) {
  var stream = fs.readFileSync(file);
  return new Buffer(stream).toString('base64');
}

(async function chromeExample() {
  const options = new chrome.Options()
      .addExtensions(encode('modheader.crx'));
  let driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  try {
    // Modify the header and make sure it is done before proceeding.
    await driver.get("http://mod-header.appspot.com/add?Test=1");
    await driver.wait(until.titleIs('Done'), 1000);

    await driver.get('http://www.xhaus.com/headers');
    await driver.wait(until.elementTextContains(driver.findElement(By.tagName('body')), 'Test'), 1000);
  } finally {
    await driver.quit();
  }
})();

(async function firefoxExample() {
  const options = new firefox.Options();
  options.setPreference('xpinstall.signatures.required', false);
  options.addExtensions('modheader.xpi');
  let driver = await new Builder()
      .forBrowser('firefox')
      .setFirefoxOptions(options)
      .build();
  try {
    // Modify the header and make sure it is done before proceeding.
    await driver.get("http://mod-header.appspot.com/add?Test=1");
    await driver.wait(until.titleIs('Done'), 1000);

    await driver.get('http://www.xhaus.com/headers');
    await driver.wait(until.elementTextContains(driver.findElement(By.tagName('body')), 'Test'), 1000);
  } finally {
    await driver.quit();
  }
})();
