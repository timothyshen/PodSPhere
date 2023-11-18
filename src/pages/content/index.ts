/**
 * DO NOT USE import someModule from '...';
 *
 * @issue-url https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/issues/160
 *
 * Chrome extensions don't support modules in content scripts.
 * If you want to use other modules in content scripts, you need to import them via these files.
 *
 */

// content.ts
import browser from 'webextension-polyfill';

// function findPodcastTitle() {
//   try {
//     const titleElement = document.querySelectorAll('//span[@data-testid="episodeTitle"]');
//     console.log(titleElement);
//   } catch {
//     console.log('error finding title');
//   }
//   return 'test';
// }

// browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   console.log('message received');
//   console.log(request);
//   console.log(sender);
//   console.log(sendResponse);
//   if (request.message === 'fetchTitle') {
//     console.log('fetching title');
//     findPodcastTitle();
//     sendResponse({ title: findPodcastTitle() });
//   }
// });

console.log('content.js');
function waitForElement(selector: string, callback: { (element: any): void; (arg0: any): void; }) {
  const interval = setInterval(() => {
    const element = document.querySelector(selector);
    if (element) {
      clearInterval(interval);
      callback(element);
    }
  }, 500); // Checks every 500 milliseconds
}

waitForElement('.Type__TypeElement-sc-goli3j-0 dYGhLW', element => {
  console.log('Element is now available:', element);
  // You can perform operations on the element here
});
