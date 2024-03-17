document.getElementById('openIndex').addEventListener('click', function() {
    chrome.tabs.create({ url: "index.html" });
});
