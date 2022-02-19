/**
 * Gets the path to the extension.
 * @returns {string}
 */
function getExtension() {
  return `${__dirname}/modheader.crx`;
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

module.exports = {
  getAddHeaderUrl,
  getClearHeadersUrl,
  getAddHeadersUrl,
  getExtension
};
