chrome.action.onClicked.addListener(async (tab) => {
  await chrome.tabs.sendMessage(tab.id, "getSelection", {}, async (response) => {
    // var url = response.url;
    // var subject = response.subject;
    // var body = response.body;

    // if (body === "") {
    //   body = "No text selected";
    //   // You may choose to pop up a text box allowing the user to enter a message instead.
    // }

    // console.log(body);
    // Further processing or actions with the extracted body text

  });
});
