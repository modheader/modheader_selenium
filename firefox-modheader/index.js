/**
 * Gets the path to the extension.
 * @returns {string}
 */
function getExtension() {
  return `${__dirname}/modheader.xpi`;
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
 * @param profile {object | string} A JSON object or JSON encoded string representing the profile to be loaded.
 *    The profile should be a single profile in the format exported by the ModHeader extension.
 * @returns {string}
 */
function getLoadProfileUrl(profile) {
  const url = new URL('https://webdriver.modheader.com/load');
  url.searchParams.set('profile', typeof profile == 'string' ? profile : JSON.stringify(profile));
  return url.href;
}

module.exports = {
  getAddHeaderUrl,
  getClearHeadersUrl,
  getAddHeadersUrl,
  getLoadProfileUrl,
  getExtension
};
