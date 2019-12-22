# ModHeader for Chrome Selenium (WebDriver)

This is the simplified, packaged extension for using [ModHeader](https://bewisse.com/modheader/) in [Selenium WebDriver](https://www.seleniumhq.org/). For the Firefox version, look for [firefox-modheader](https://www.npmjs.com/package/firefox-modheader) instead.

## Installation:

```
npm install chrome-modheader
```

## Usage

```
const { getExtension } = require('chrome-modheader');


const options = new chrome.Options().addExtensions(getExtension());
const driver = await new Builder()
  .forBrowser('chrome')
  .setChromeOptions(options)
  .build();
```

## API:

All APIs are URL-based. Please make sure to URL encode your name and value
properly.

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
