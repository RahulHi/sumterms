/*global chrome*/

import React, { useEffect, useState } from 'react';

function MessageReader() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Get the current array of messages from storage
    chrome.storage.local.get(['messages'], function(result) {
      setMessages(result.messages || []);

      // Clear the array of messages in storage
      chrome.storage.local.set({ messages: [] });
    });

    // Listen for changes to the messages array in storage
    const storageListener = (changes, areaName) => {
      if (areaName === 'local' && changes.messages) {
        setMessages(changes.messages.newValue);
      }
    };

    chrome.storage.onChanged.addListener(storageListener);

    // Cleanup listener on unmount
    return () => {
      chrome.storage.onChanged.removeListener(storageListener);
    };
  }, []);

  return (
    <div style={{ width: "240px", height: "240px", overflow: "hidden", backgroundColor: "burlywood" }}>
      {/* <h2>Received Messages:</h2>
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))} */}

      <div style={{width: "100%", height: "100%"}}>
        <p>Analyzing privacy policy...</p>
      </div>

      <div style={{width: "100%", height: "100%"}}>
        <p>Privacy policy analysis complete!</p>

        <p>Here are the results:</p>
      </div>
    </div>
  );
}

export default MessageReader;