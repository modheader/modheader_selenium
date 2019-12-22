const { getExtension, getAddHeaderUrl } = require('./firefox-modheader');
const { createFirefoxDriver, verifyHeaderAdded } = require('./helper');

(async function firefoxExample() {
  const driver = await createFirefoxDriver(getExtension());
  try {
    await driver.get(getAddHeaderUrl('Test', 'ModHeader Test'));
    await verifyHeaderAdded(driver);
  } finally {
    await driver.quit();
  }
})();
