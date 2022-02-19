const {
  getExtension,
  getAddHeaderUrl,
  getAddHeadersUrl,
  getLoadProfileUrl
} = require('chrome-modheader');
const chrome = require('selenium-webdriver/chrome');
const { Builder, until, By } = require('selenium-webdriver');
require('chromedriver');

(async function () {
  const options = new chrome.Options().addExtensions(getExtension());
  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  try {
    await driver.get(getAddHeaderUrl('Test', 'ModHeader Test'));
    await driver.get('https://modheader.com/headers');
    await driver.wait(
      until.elementTextContains(driver.findElement(By.tagName('body')), 'ModHeader Test'),
      1000
    );

    await driver.get(getAddHeadersUrl({ Test2: 'ModHeader Test 2' }));
    await driver.get('https://modheader.com/headers');
    await driver.wait(
      until.elementTextContains(driver.findElement(By.tagName('body')), 'ModHeader Test 2'),
      1000
    );

    await driver.get(
      getLoadProfileUrl({
        appendMode: false,
        respHeaders: [],
        filters: [],
        headers: [{ enabled: true, name: 'Test3', value: 'ModHeader Test 3' }]
      })
    );
    await driver.get('https://modheader.com/headers');
    await driver.wait(
      until.elementTextContains(driver.findElement(By.tagName('body')), 'ModHeader Test 3'),
      1000
    );
  } finally {
    await driver.quit();
  }
})();
