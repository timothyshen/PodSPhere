/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */

import browser from 'webextension-polyfill';
import { getToken, fetchEpisode } from '../popup/lib/Spotify';
import { get } from 'http';

browser.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  let { urls } = await browser.storage.local.get('urls');
  console.log(urls);
  if (request.message === 'getTitle') {
    console.log('getting title');
    browser.tabs.query({ url: urls }).then(tabs => {
      console.log(tabs);
      if (tabs[0].url && tabs[0].url.includes('spotify')) {
        console.log('sending message to content script');
        try {
          browser.tabs.sendMessage(tabs[0].id, { message: 'fetchTitle' }).then(response => {
            console.log(response);
            sendResponse();
          });
        } catch {
          console.log('error sending message to content script');
        }
      }
    });
    return true; // Keep the message channel open for the response
  }
});

// Listening for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('request', request);
  if (request.action === 'fetchPodcastData') {
    console.log('fetching podcast data');
    getToken().then(token => {
      fetchEpisode(token.access_token, request.podcastId)
        .then(data => {
          console.log('podcast data', data);
          sendResponse(data);
        })
        .catch(error => {
          console.log('error fetching podcast data', error);
        });
    });
    return true; // Indicates an asynchronous response
  }
});

console.log('background loaded');
