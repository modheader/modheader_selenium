# ModHeader for Chrome Selenium (WebDriver)

This is for using [ModHeader](https://modheader.com/) in [Selenium WebDriver](https://www.seleniumhq.org/) for Chrome. For the Firefox version, look for [firefox-modheader](https://www.npmjs.com/package/firefox-modheader) instead.

## Installation:

```bash
npm install chrome-modheader
```

## Usage

```javascript
const { getExtension, getAddHeaderUrl } = require('chrome-modheader');

const options = new chrome.Options().addExtensions(getExtension());
const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
await driver.get(getAddHeaderUrl('HeaderName', 'HeaderValue'));
```

Please visit [ModHeader webdriver documentation page](https://docs.modheader.com/advanced/selenium-webdriver) for
more details on how to use ModHeader in Selenium WebDriver.
