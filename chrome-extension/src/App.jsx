/*global chrome*/

import React, { useEffect, useState } from 'react';

function MessageReader() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Get the current array of messages from storage
    chrome.storage.local.get(['messages'], function(result) {
      alert('Value currently is ' + result.messages);
      setMessages(result.messages || []);
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
    <div style={{ width: "960px", height: "960px", overflow: "auto" }}>
      <h2>Received Messages:</h2>
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </div>
  );
}

export default MessageReader;