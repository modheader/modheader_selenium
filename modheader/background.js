const SPECIAL_CHARS = '^$&+?.()|{}[]/'.split('');
let currentProfile;

/**
 * Check whether the current request url pass the given list of filters.
 */
function passFilters_(url, type, filters) {
  if (!filters) {
    return true;
  }
  let allowUrls = false;
  let hasUrlFilters = false;
  let allowTypes = false;
  let hasResourceTypeFilters = false;
  for (const filter of filters) {
    if (filter.enabled) {
      switch (filter.type) {
        case 'urls':
          hasUrlFilters = true;
          if (url.search(filter.urlRegex) === 0) {
            allowUrls = true;
          }
          break;
        case 'types':
          hasResourceTypeFilters = true;
          if (filter.resourceType.indexOf(type) >= 0) {
            allowTypes = true;
          }
          break;
      }
    }
  }
  return (!hasUrlFilters || allowUrls) && (!hasResourceTypeFilters || allowTypes);
}

function loadSelectedProfile_() {
  let appendMode = false;
  let headers = [];
  let respHeaders = [];
  let filters = [];
  if (localStorage.profile) {
    const selectedProfile = JSON.parse(localStorage.profile);

    function filterEnabledHeaders_(headers) {
      const output = [];
      for (const header of headers) {
        // Overrides the header if it is enabled and its name is not empty.
        if (header.enabled && header.name) {
          output.push({ name: header.name, value: header.value });
        }
      }
      return output;
    }
    for (const filter of selectedProfile.filters) {
      if (filter.urlPattern) {
        const urlPattern = filter.urlPattern;
        const joiner = [];
        for (let i = 0; i < urlPattern.length; ++i) {
          let c = urlPattern.charAt(i);
          if (SPECIAL_CHARS.indexOf(c) >= 0) {
            c = '\\' + c;
          } else if (c === '\\') {
            c = '\\\\';
          } else if (c === '*') {
            c = '.*';
          }
          joiner.push(c);
        }
        filter.urlRegex = joiner.join('');
      }
      filters.push(filter);
    }
    appendMode = selectedProfile.appendMode;
    headers = filterEnabledHeaders_(selectedProfile.headers);
    respHeaders = filterEnabledHeaders_(selectedProfile.respHeaders);
  }
  return {
    appendMode: appendMode,
    headers: headers,
    respHeaders: respHeaders,
    filters: filters
  };
}

function modifyHeader(source, dest) {
  if (!source.length) {
    return;
  }
  // Create an index map so that we can more efficiently override
  // existing header.
  const indexMap = {};
  for (const index in dest) {
    const header = dest[index];
    indexMap[header.name.toLowerCase()] = index;
  }
  for (const header of source) {
    const index = indexMap[header.name.toLowerCase()];
    if (index !== undefined) {
      if (!currentProfile.appendMode) {
        dest[index].value = header.value;
      } else if (currentProfile.appendMode === 'comma') {
        if (dest[index].value) {
          dest[index].value += ',';
        }
        dest[index].value += header.value;
      } else {
        dest[index].value += header.value;
      }
    } else {
      dest.push({ name: header.name, value: header.value });
      indexMap[header.name.toLowerCase()] = dest.length - 1;
    }
  }
}

function onBeforeRequestHandler_(details) {
  if (
    details.url.includes('//webdriver.modheader.com/add') ||
    details.url.includes('//webdriver.modheader.com/clear') ||
    details.url.includes('//webdriver.modheader.com/load') ||
    details.url.includes('//webdriver.bewisse.com/add') ||
    details.url.includes('//webdriver.bewisse.com/clear') ||
    details.url.includes('//webdriver.bewisse.com/load') ||
    details.url.includes('//bewisse.com/add') ||
    details.url.includes('//bewisse.com/clear') ||
    details.url.includes('//bewisse.com/load')
  ) {
    const parser = document.createElement('a');
    parser.href = details.url;
    chrome.tabs.update(null, {
      url: chrome.runtime.getURL(parser.pathname + '.html' + parser.search)
    });
    return {
      cancel: true
    };
  }
}

function modifyRequestHeaderHandler_(details) {
  currentProfile = loadSelectedProfile_();
  if (currentProfile && passFilters_(details.url, details.type, currentProfile.filters)) {
    modifyHeader(currentProfile.headers, details.requestHeaders);
  }
  return { requestHeaders: details.requestHeaders };
}

function modifyResponseHeaderHandler_(details) {
  if (currentProfile && passFilters_(details.url, details.type, currentProfile.filters)) {
    const responseHeaders = JSON.parse(JSON.stringify(details.responseHeaders));
    modifyHeader(currentProfile.respHeaders, responseHeaders);
    if (JSON.stringify(responseHeaders) !== JSON.stringify(details.responseHeaders)) {
      return { responseHeaders: responseHeaders };
    }
  }
}

chrome.webRequest.onBeforeRequest.addListener(onBeforeRequestHandler_, { urls: ['<all_urls>'] }, [
  'blocking'
]);

function getChromeVersion() {
  let pieces = navigator.userAgent.match(/Chrom(?:e|ium)\/([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)/);
  if (pieces == null || pieces.length !== 5) {
    return undefined;
  }
  pieces = pieces.map((piece) => parseInt(piece, 10));
  return {
    major: pieces[1],
    minor: pieces[2],
    build: pieces[3],
    patch: pieces[4]
  };
}

const CHROME_VERSION = getChromeVersion();
const requiresExtraHeaders = CHROME_VERSION && CHROME_VERSION.major >= 72;

chrome.webRequest.onBeforeSendHeaders.addListener(
  modifyRequestHeaderHandler_,
  { urls: ['<all_urls>'] },
  requiresExtraHeaders
    ? ['requestHeaders', 'blocking', 'extraHeaders']
    : ['requestHeaders', 'blocking']
);

chrome.webRequest.onHeadersReceived.addListener(
  modifyResponseHeaderHandler_,
  { urls: ['<all_urls>'] },
  requiresExtraHeaders
    ? ['responseHeaders', 'blocking', 'extraHeaders']
    : ['responseHeaders', 'blocking']
);
