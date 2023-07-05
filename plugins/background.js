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

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request === "DoTranslate") {
      try {
        console.log("Received DoTranslate Message");

        //TODO: Have it read from translate queue and send request
        //TODO: Move API request from contentscript to here.
        //TODO: Add listener from content->here for adding text to the queue
      } catch (err) {
          console.log(err);
      }
  }
  else
      sendResponse({ body: "" }); // snub them.
});
