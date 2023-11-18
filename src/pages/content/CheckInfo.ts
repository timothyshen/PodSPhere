// content.ts
import browser from 'webextension-polyfill';

function findPodcastTitle() {
  try {
    const titleElement = document.querySelectorAll('//span[@data-testid="episodeTitle"]');
    console.log(titleElement);
  } catch {
    console.log('error finding title');
  }
  return 'test';
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'fetchTitle') {
    console.log('fetching title');
    sendResponse({ title: findPodcastTitle() });
  }
});
