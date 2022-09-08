const fs = require('fs');

function encode(file) {
  const stream = fs.readFileSync(file);
  return Buffer.from(stream).toString('base64');
}

/**
 * Gets the path to the extension.
 * @returns {string}
 */
function getExtension() {
  return `${__dirname}/modheader.crx`;
}

/**
 * Gets the base64 encoding of the extension.
 * This is used for webdriver IO or other frameworks that required base64 encoding instead of the file path.
 * @returns {string}
 */
function getEncodedExtension() {
  return encode(`${__dirname}/modheader.crx`);
}

/**
 * Get a URL to add a request headers.
 * @param name {string} the request header name to be added
 * @param value {string} the request header value to be added
 * @returns {string}
 */
function getAddHeaderUrl(name, value) {
  const url = new URL('https://webdriver.modheader.com/add');
  url.searchParams.set(name, value);
  return url.href;
}

/**
 * Get a URL to add request headers.
 * @param nameValueMap {object} An object where the key is the name of the request header, and the value is the value
 * of header.
 * @returns {string}
 */
function getAddHeadersUrl(nameValueMap) {
  const url = new URL('https://webdriver.modheader.com/add');
  for (const [name, value] of Object.entries(nameValueMap)) {
    url.searchParams.set(name, value);
  }
  return url.href;
}

/**
 * Gets the URL to clear the request headers.
 * @returns {string}
 */
function getClearHeadersUrl() {
  return 'https://webdriver.modheader.com/clear';
}

/**
 * Gets the URL to load the profile.
 * @param profile {object | string} A JSON object/array or JSON encoded string representing the profile to be loaded.
 *    The profile should match the format exported by the ModHeader extension.
 * @returns {string}
 */
function getLoadProfileUrl(profile) {
  const url = new URL('https://webdriver.modheader.com/load');
  url.searchParams.set('profile', typeof value == 'string' ? profile : JSON.stringify(profile));
  return url.href;
}

module.exports = {
  getAddHeaderUrl,
  getEncodedExtension,
  getClearHeadersUrl,
  getAddHeadersUrl,
  getLoadProfileUrl,
  getExtension
};
