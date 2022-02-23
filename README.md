# ModHeader for Selenium (WebDriver)

This is the repo for using [ModHeader](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj) in [Selenium](https://www.seleniumhq.org/). For ModHeader's browser extension source code, please visit https://github.com/modheader/modheader

## Donation

If you find ModHeader useful, please consider making a donation. If you use it for your company project, please ask your company to make a monthly donation!

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://paypal.me/hao1300)

## Installation:

To use this in NodeJS for Chrome, install the [chrome-modheader](https://www.npmjs.com/package/chrome-modheader) package:

```bash
npm install chrome-modheader
```

To use this in NodeJS for Firefox, install the [firefox-modheader](https://www.npmjs.com/package/firefox-modheader) package:

```bash
npm install firefox-modheader
```

For other programming languages, you can download the prepackaged extensions below and load them into WebDriver as needed.

[Download for Chrome](https://github.com/modheader/modheader_selenium/raw/main/chrome-modheader/modheader.crx)

[Download for Firefox](https://github.com/modheader/modheader_selenium/raw/main/firefox-modheader/modheader.xpi)

## Usage:

Take a look at the [examples](./examples) directory for more detailed examples

#### Selenium Webdriver with Chrome:

```javascript
const { getExtension, getAddHeaderUrl } = require('chrome-modheader');
const options = new chrome.Options().addExtensions(getExtension());
const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
await driver.get(getAddHeaderUrl('HeaderName', 'HeaderValue'));
```

#### Selenium Webdriver with Firefox:

```javascript
const { getExtension, getAddHeaderUrl } = require('firefox-modheader');

const options = new firefox.Options();
options.addExtensions(getExtension());
const driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
await driver.get(getAddHeaderUrl('HeaderName', 'HeaderValue'));
```

#### Webdriver.io:

Modify wdio.conf.js file

```javascript
const chromeModheader = require('chrome-modheader');
const firefoxModheader = require('firefox-modheader');

exports.config = {
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
  services: [
    ['selenium-standalone', { logPath: 'logs', installArgs: { drivers }, args: { drivers } }],
    [
      'firefox-profile',
      {
        extensions: [firefoxModheader.getExtension()]
      }
    ]
  ],

  before: function (capabilities, specs) {
    browser.url(chromeModheader.getAddHeaderUrl('accept-encoding', ''));
  }
};
```

#### Java Selenium

For Chrome

```java
Path currentRelativePath = Paths.get("chrome-modheader/modheader.crx");
ChromeOptions options = new ChromeOptions();
options.addExtensions(new File(currentRelativePath.toAbsolutePath().toString()));
ChromeDriver driver = new ChromeDriver(options);
driver.get("https://webdriver.modheader.com/add?test=ModHeader%20Test");
```

For Firefox

```java
Path currentRelativePath = Paths.get("firefox-modheader/modheader.xpi");
FirefoxProfile profile = new FirefoxProfile();
profile.addExtension(new File(currentRelativePath.toAbsolutePath().toString()));
FirefoxOptions options = new FirefoxOptions();
options.setProfile(profile);
FirefoxDriver driver = new FirefoxDriver(options);
driver.get("https://webdriver.modheader.com/add?test=ModHeader%20Test");
```

#### Python Selenium

For Chrome

```python
options = webdriver.ChromeOptions()
options.add_extension('chrome-modheader/modheader.crx')
driver = webdriver.Chrome(options=options, service=Service(ChromeDriverManager().install()))
driver.get("https://webdriver.modheader.com/add?test=ModHeader%20Test")
```

For Firefox

```python
driver = webdriver.Firefox(service=Service(GeckoDriverManager().install()))
driver.install_addon('firefox-modheader/modheader.xpi')
driver.get("https://webdriver.modheader.com/add?test=ModHeader%20Test")
```

## API:

All APIs are URL-based. Please make sure to URL encode your name and value
properly.

Note that the `webdriver.modheader.com` URLs only work when the extensions are
properly loaded. Older versions of the extensions use `webdriver.bewisse.com`
and `bewisse.com`. These will continue to work in the newer version.

If you are using npm, you can also use the `getAddHeaderUrl()`, `getAddHeadersUrl()`
and `getClearHeadersUrl()` functions to craft these URLs. Be sure to do `driver.get()`,
and be mindful that these will change the URL of the WebDriver.

#### Add request header:

```
https://webdriver.modheader.com/add?{name1}={value1}&{name2}={value2}&...
```

e.g., `https://webdriver.modheader.com/add?Test=1`

Node API equivalent:

```javascript
function getAddHeaderUrl(name, value) {}
function getAddHeadersUrl({ name: value }) {}
```

Construct the URL above using `getAddHeaderUrl('Test', '1')` or `getAddHeadersUrl({ Test: '1' })`

#### Clear all modified request headers:

```
https://webdriver.modheader.com/clear
```

Node API equivalent:

```javascript
function getClearHeadersUrl() {}
```

#### Load custom profile:

```
https://webdriver.modheader.com/load?profile={exported_profile_in_json}
```

exported_profile_in_json can be obtained from the regular ModHeader
extension using ... -> Export Profile. Note that ModHeader exports
an array of profiles by default, but this API will only accept a single
profile, so you will need to extract the profile you want from the array
and pass it in.

Node API equivalent:

```javascript
function getLoadProfileUrl(exported_profile) {}
```

## Updating codes

#### Packaging the extensions

For Chrome (update the modheader.crx file):
Go to chrome://extensions, and click on "Pack extension".

For Firefox (update the modheader.xpi file):

```bash
npm install --global web-ext
web-ext sign --api-key=$AMO_JWT_ISSUER --api-secret=$AMO_JWT_SECRET
```

#### Verification

Copy `modheader.crx` into chrome-modheader, and copy `modheader.xpi` into firefox-modheader.
Run `npm run verify-chrome` and `npm run verify-firefox` to verify that the packaged extensions are working fine.

#### Publishing

`cd chrome-modheader`, update the version in `package.json`, then `npm publish`
`cd firefox-modheader`, update the version in `package.json`, then `npm publish`
