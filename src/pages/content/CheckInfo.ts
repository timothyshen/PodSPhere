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

browser.runtime.onMessage((request, sender, sendResponse) => {
  console.log('message received');
  console.log(request);
  console.log(sender);
  console.log(sendResponse);
  if (request.message === 'fetchTitle') {
    console.log('fetching title');
    findPodcastTitle();
    sendResponse({ title: findPodcastTitle() });
  }
});
