# modheader_selenium

[ModHeader](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj) for [Selenium](https://www.seleniumhq.org/).

## Examples:

To use ModHeader in Chrome, do the following:
```
function encode(file) {
  var stream = fs.readFileSync(file);
  return new Buffer(stream).toString('base64');
}

const options = new chrome.Options()
    .addExtensions(encode('extension.crx'));
let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
// Modify the header and make sure it is done before proceeding.
await driver.get("http://mod-header.appspot.com/add?Test=1");
await driver.wait(until.titleIs('Done'), 1000);
```

For Firefox, do the following:
```
const options = new firefox.Options();
options.setPreference('xpinstall.signatures.required', false);
options.addExtensions('extension.xpi');
let driver = await new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(options)
    .build();
// Modify the header and make sure it is done before proceeding.
await driver.get("http://mod-header.appspot.com/add?Test=1");
await driver.wait(until.titleIs('Done'), 1000);
```

## API:

All APIs are URL-based. Please make sure to URL encode your name and value
properly.

### Add request header:
http://mod-header.appspot.com/add?<name1>=<value1>&<name2>=<value2>&...

e.g., http://mod-header.appspot.com/add?Test=1

### Clear all modified request headers:
http://mod-header.appspot.com/clear

### Load custom profile:
http://mod-header.appspot.com/load?profile=<exported_profile_in_json>

exported_profile_in_json can be obtained from the regular ModHeader
extension using ... -> Export Profile.
