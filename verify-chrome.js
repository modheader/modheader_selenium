const { getExtension, getAddHeaderUrl } = require('./chrome-modheader');
const { createChromeDriver, verifyHeaderAdded } = require('./helper');

(async function chromeExample() {
  const driver = await createChromeDriver(getExtension());
  try {
    await driver.get(getAddHeaderUrl('Test', 'ModHeader Test'));
    await verifyHeaderAdded(driver);
  } finally {
    await driver.quit();
  }
})();
