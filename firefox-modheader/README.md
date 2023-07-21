# ModHeader for Firefox Selenium (WebDriver)

This is for using [ModHeader](https://modheader.com/) in [Selenium WebDriver](https://www.seleniumhq.org/) for Firefox. For the Chrome version, look for [chrome-modheader](https://www.npmjs.com/package/chrome-modheader) instead.

## Installation:

```bash
npm install firefox-modheader
```

## Usage

```javascript
const { getExtension, getAddHeaderUrl } = require('firefox-modheader');

const options = new firefox.Options();
options.addExtensions(getExtension());
const driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
await driver.get(getAddHeaderUrl('HeaderName', 'HeaderValue'));
```

Please visit [ModHeader webdriver documentation page](https://modheader.com/docs/advanced/selenium-webdriver) for
more details on how to use ModHeader in Selenium WebDriver.
