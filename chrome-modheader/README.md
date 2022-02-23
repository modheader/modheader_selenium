# ModHeader for Chrome Selenium (WebDriver)

This is the simplified, packaged extension for using [ModHeader](https://modheader.com/) in [Selenium WebDriver](https://www.seleniumhq.org/). For the Firefox version, look for [firefox-modheader](https://www.npmjs.com/package/firefox-modheader) instead.

## Installation:

```bash
npm install chrome-modheader
```

## Usage

```javascript
const { getExtension, getAddHeaderUrl } = require('chrome-modheader');


const options = new chrome.Options().addExtensions(getExtension());
const driver = await new Builder()
  .forBrowser('chrome')
  .setChromeOptions(options)
  .build();
await driver.get(getAddHeaderUrl('HeaderName', 'HeaderValue'));
```

## API:

All APIs are URL-based. Please make sure to URL encode your name and value
properly.

Note that the `webdriver.modheader.com` URLs only work when the extensions are
properly loaded. Older versions of the extensions use `webdriver.bewisse.com`
and `bewisse.com`. These will continue to work in the newer version.

You can use the `getAddHeaderUrl()` and `getClearHeadersUrl()` functions to
craft these URLs. Be sure to do `driver.get()`, and be mindful that these
will change the URL of the WebDriver.

### Get extension file:

Get the extension file:

```javascript
function getExtension() {}
```

Get the base64 encoded extension file (this is needed for legacy ChromeDriver / WebDriver IO):

```javascript
function getEncodedExtension() {}
```

API Breaking change: Older versions of chrome-modheader used to return base64 encoding of
the extension file in `getExtension()`. This is no longer working by default with a newer
version of ChromeDriver. If you are upgrading chrome-modheader, we strongly recommend you
to upgrade to a newer version of ChromeDriver too. If you still need the base64 encoded
extension, please use the `getEncodedExtension()` function instead.

### Add request header:

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

### Clear all modified request headers:

```
https://webdriver.modheader.com/clear
```

Node API equivalent:

```javascript
function getClearHeadersUrl() {}
```

### Load custom profile:

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
