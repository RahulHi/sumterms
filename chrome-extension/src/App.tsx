/*global chrome*/
import React, { useEffect, useState } from "react";

function MessageReader() {
  const [receivedMessage, setReceivedMessage] = useState("");

  // Listen for messages sent from content.js
  useEffect(() => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === "Completed Privacy Policy Search") {
        // Handle the received message
        setReceivedMessage(message.data);
      }
    });

    // Make sure to remove the listener when the component unmounts
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  return (
    <div>
      <h2>Received Message:</h2>
      <p>{receivedMessage}</p>
    </div>
  );
}

export default MessageReader;
