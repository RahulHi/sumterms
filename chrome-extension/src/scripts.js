// Function to fetch a page and parse text within <strong> tags
import 

function fetchAndParsePage(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          reject(new Error("Network response was not ok"));
          return;
        }
        return response.text();
      })
      .then((html) => {
        const tempElement = document.createElement("div");
        tempElement.innerHTML = html;
        const strongElements = tempElement.querySelectorAll("strong");
        const strongTextArray = Array.from(strongElements).map(
          (strongElement) => strongElement.textContent
        );
        resolve(strongTextArray);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const findLinkContainingWord = (word) => {
  setTimeout(() => {
    const links = Array.from(document.querySelectorAll("a"));
    const foundLinks = links.filter((link) =>
      link.textContent.toLowerCase().includes(word)
    );

    if (foundLinks.length > 0) {
      chrome.runtime.sendMessage({
        type: "Completed Privacy Policy Search",
        data: foundLinks[0].href,
      });
      console.log("Link with the word:", foundLinks[0].href);

      const link = foundLinks[0].href;

      fetchAndParsePage(link)
        .then((strongTextArray) => {
          callModel(strongTextArray.reduce((accumulator, currentValue) => accumulator + currentValue, ''))
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, 3000); // Delay execution by 3 seconds for link search
};

function callModel(data) {
  // Construct the URL with query parameters
  var url = "ml.py?" + new URLSearchParams(data).toString();

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      chrome.runtime.sendMessage({
        type: "data",
        data: response,
      });
    } else {
      console.error("Failed to call Python script.");
    }
  };

  xhr.send();
}

// Call the Python script when the page loads
callModel();


// Example usage: Fetch and parse a page
 // Replace with the URL of the page you want to fetch
