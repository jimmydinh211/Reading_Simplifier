chrome.tabs.onActivated.addListener(function (tab) {
    const selectedText = window.getSelection().toString();
    document.getElementById("selectedText").innerHTML = selectedText;
});
