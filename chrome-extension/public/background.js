// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "Completed Privacy Policy Search") {
    // Get the current array of messages from storage
    chrome.storage.local.get(["messages"], function (result) {
      let messages = result.messages || [];

      // Add the new message to the array
      messages.push(request);

      console.log(request);

      // Save the updated array back to storage
      chrome.storage.local.set({ messages: messages }, function () {
        console.log("Message saved");
      });

      // // Retrieve from storage for testing purposes
      // chrome.storage.local.get(["messages"], function (result) {
      //   console.log("Value currently is " + result.messages);
      // });
    });
  }
});
