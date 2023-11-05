/* global chrome */

// content.js
const specificElement = true//document.querySelector(".specific-element-selector");

if (specificElement) {
  // Send a message to the background script
  chrome.runtime.sendMessage({ type: "Completed Privacy Policy Search", data: "Sexy" });
}
