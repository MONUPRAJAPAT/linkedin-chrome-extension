var TAB_ID = null;

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.url &&
    tab.url.includes("linkedin.com/company/")
  ) {
    const companyUrl = tab.url;
    if (!companyUrl.includes("/about")) {
      console.log("updating");
      const aboutPageUrl = companyUrl.replace(/\/?$/, "/about");
      await chrome.tabs.update(tabId, { url: aboutPageUrl });
    } else {
      TAB_ID = tabId;
      console.log("yippie");
      chrome.tabs.executeScript(tabId, { file: "contentScript.js" });
    }
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openNewWindow") {
    // Open a new Chrome window with index.html
    chrome.windows.create({
      type: "normal",
      url: chrome.runtime.getURL("index.html"),
      width: screen.availWidth,
      height: screen.availHeight,
      top: 0,
      left: 0,
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "extractCompanyInfo") {
    // Handle extracted company information
    const companyInfo = message.companyInfo;
    console.log("Company Info:", companyInfo);

    if (companyInfo) {
      fetch("http://localhost:3001/companies/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(companyInfo),
      })
        .then((response) => {
          console.log("companyInfo andar", companyInfo);
          chrome.tabs.sendMessage(TAB_ID, {
            action: "displayCompanySidebar",
            companyInfo: companyInfo,
          });
        })
        .catch((error) => {
          console.log("hahahaha");
        });
    } else {
      console.log("There is no company info");
    }
  }
});
