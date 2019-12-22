function getExtension() {
  return `${__dirname}/modheader.xpi`;
}

function getAddHeaderUrl(name, value) {
  const url = new URL('https://bewisse.com/add');
  url.searchParams.set(name, value);
  return url.href;
}

async function getClearHeadersUrl() {
  return 'https://bewisse.com/clear';
}

module.exports = {
  getAddHeaderUrl,
  getClearHeadersUrl,
  getExtension
};
