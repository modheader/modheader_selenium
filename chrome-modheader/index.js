const fs = require('fs');

function encode(file) {
  const stream = fs.readFileSync(file);
  return Buffer.from(stream).toString('base64');
}

function getExtension() {
  return encode(`${__dirname}/modheader.crx`);
}

function getAddHeaderUrl(name, value) {
  const url = new URL('https://webdriver.bewisse.com/add');
  url.searchParams.set(name, value);
  return url.href;
}

async function getClearHeadersUrl() {
  return 'https://webdriver.bewisse.com/clear';
}

module.exports = {
  getAddHeaderUrl,
  getClearHeadersUrl,
  getExtension
};
