/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */

import browser from 'webextension-polyfill';

browser.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  let { urls } = await browser.storage.local.get('urls');
  console.log(urls);
  if (request.message === 'getTitle') {
    console.log('getting title');
    browser.tabs.query({ active: true, autoDiscardable: true }).then(tabs => {
      console.log(tabs);
      if (tabs[0].url && tabs[0].url.includes('spotify')) {
        console.log('sending message to content script');
        try {
          browser.tabs.sendMessage(tabs[0].id, { message: 'fetchTitle' }).then(response => {
            console.log(response);
            sendResponse({ title: response.title });
          });
        } catch {
          console.log('error sending message to content script');
        }
      }
    });
    return true; // Keep the message channel open for the response
  }
});

console.log('background loaded');
