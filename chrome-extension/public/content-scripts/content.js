/* global chrome */

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

      // console.log(link.includes("airbnb"));
      // console.log(link.includes("twitter"));

      if (link.includes("airbnb")) {
        chrome.runtime.sendMessage({
          type: "data",
          data: data["airbnb"],
        });
        console.log(data["airbnb"]);
      } else if (link.includes("twitter")) {
        chrome.runtime.sendMessage({
          type: "data",
          data: data["twitter"],
        });
        console.log(data["twitter"]);
      }
    }
  }, 3000); // Delay execution by 3 seconds for link search
};

data = {
  airbnb:
    "1. Contact\n Account\n and Profile Information\n 2. Identity Verification and Payment Information\n 3. Additional Profile Information\n 4. Information About Others.\n 5. Address Book Contact Information\n 6. Geolocation Information\n 7. Usage Information\n 8. Log Data and Device Information\n 9. Payment Transaction Information\n 10. Third-Party Services\n 11. Background Information\n 12. Enterprise Product Invitations and Account Management. 13. Referrals and Co-Travelers 14. Guest Travel Insurance",
  twitter:
    "1. Personal Accounts\n 2. Professional Accounts\n 3. Payment Information\n 4. Preferences\n 5. Biometric Information 6. Job Applications / Recommendations 7. Usage Information 8. Purchase and payments 9. Device Information 10. Location Information 11. Inferred Identity 12. Log Information 13. Advertisements 14. Cookies and similar technologies 15. Interactions with our content on third-party sites 16. Ad Partners\n Developers\n Publishers 17. Other Third Parties\n Account Connections\n and Integrations ",
};
findLinkContainingWord('privacy')