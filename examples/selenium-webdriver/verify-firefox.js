const { getExtension, getAddHeaderUrl } = require('firefox-modheader');
const firefox = require('selenium-webdriver/firefox');
const { Builder, until, By } = require('selenium-webdriver');
require('geckodriver');

(async function () {
  const options = new firefox.Options().addExtensions(getExtension());
  const driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
  try {
    await driver.get(getAddHeaderUrl('Test', 'ModHeader Test'));
    await driver.get('https://modheader.com/headers');
    await driver.wait(
      until.elementTextContains(driver.findElement(By.tagName('body')), 'ModHeader Test'),
      1000
    );
  } finally {
    await driver.quit();
  }
})();
