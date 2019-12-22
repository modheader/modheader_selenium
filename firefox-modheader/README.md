# ModHeader for Firefox Selenium (WebDriver)

This is the simplified, packaged extension for using [ModHeader](https://bewisse.com/modheader/) in [Selenium WebDriver](https://www.seleniumhq.org/). For the Chrome version, look for [chrome-modheader](https://www.npmjs.com/package/chrome-modheader) instead.

## Installation:

```
npm install firefox-modheader
```

## Usage

```
const { getExtension, getAddHeaderUrl } = require('firefox-modheader');

const options = new firefox.Options();
options.addExtensions(getExtension());
const driver = await new Builder()
  .forBrowser('firefox')
  .setFirefoxOptions(options)
  .build();
await driver.get(getAddHeaderUrl('HeaderName', 'HeaderValue'));
```

## API:

All APIs are URL-based. Please make sure to URL encode your name and value
properly.

You can use the `getAddHeaderUrl()` and `getClearHeadersUrl()` functions to
craft these URLs. Be sure to do `driver.get()`, and be mindful that these
will change the URL of the WebDriver.

### Add request header:

```
https://bewisse.com/add?{name1}={value1}&{name2}={value2}&...
```

e.g., `https://bewisse.com/add?Test=1`

### Clear all modified request headers:

```
https://bewisse.com/clear
```

### Load custom profile:

```
https://bewisse.com/load?profile={exported_profile_in_json}
```

exported_profile_in_json can be obtained from the regular ModHeader
extension using ... -> Export Profile.
