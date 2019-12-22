const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
require('chromedriver');
require('geckodriver');

async function createChromeDriver(extension) {
  const options = new chrome.Options().addExtensions(extension);
  return await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
}

async function createFirefoxDriver(extension) {
  const options = new firefox.Options();
  options.addExtensions(extension);
  return await new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(options)
    .build();
}

async function verifyHeaderAdded(driver) {
  await driver.get('https://bewisse.com/modheader/headers/');
  await driver.wait(
    until.elementTextContains(
      driver.findElement(By.tagName('body')),
      'ModHeader Test'
    ),
    1000
  );
}

module.exports = {
  createChromeDriver,
  createFirefoxDriver,
  verifyHeaderAdded
};
