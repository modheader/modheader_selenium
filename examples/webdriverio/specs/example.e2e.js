const { getAddHeaderUrl, getAddHeadersUrl, getLoadProfileUrl } = require('chrome-modheader');

describe('Headers', () => {
  it('should add single header', async () => {
    await browser.url(getAddHeaderUrl('Test', 'ModHeader Test'));
    await browser.url('https://modheader.com/headers');
    await expect($('body')).toHaveTextContaining('ModHeader Test');
  });

  it('should add an object of headers', async () => {
    await browser.url(getAddHeadersUrl({ Test2: 'ModHeader Test 2' }));
    await browser.url('https://modheader.com/headers');
    await expect($('body')).toHaveTextContaining('ModHeader Test 2');
  });

  it('should load profile', async () => {
    await browser.url(
      getLoadProfileUrl({
        appendMode: false,
        respHeaders: [],
        filters: [],
        headers: [{ enabled: true, name: 'Test3', value: 'ModHeader Test 3' }]
      })
    );
    await browser.url('https://modheader.com/headers');
    await expect($('body')).toHaveTextContaining('ModHeader Test 3');
  });
});
