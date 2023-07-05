// /**
// * Gets the HTML of the user's selection

// */
function getSelectionHTML() {
    var userSelection;
    if (window.getSelection) {
        // W3C Ranges
        userSelection = window.getSelection();
        // Get the range:
        if (userSelection.getRangeAt)
            var range = userSelection.getRangeAt(0);
        else {
            var range = document.createRange();
            range.setStart(userSelection.anchorNode, userSelection.anchorOffset);
            range.setEnd(userSelection.focusNode, userSelection.focusOffset);
        }
        // And the HTML:
        var clonedSelection = range.cloneContents();
        var div = document.createElement('div');
        div.appendChild(clonedSelection);
        return div.innerHTML;
    } else if (document.selection) {
        // Explorer selection, return the HTML
        userSelection = document.selection.createRange();
        return userSelection.htmlText;
    } else {
        return '';
    }
}
/**
* Listens for a request from the button in the browser.
* When it sees the getSelection request, it returns the selection HTML, as well as the URL and title of the tab.
*/
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request === "getSelection") {
        var selection = window.getSelectionHTML();

        const first = "sk-f3RF";

        const requestBody =
        {
            "model": "gpt-3.5-turbo",
            "messages": [{ "role": "system", "content": "You are a helpful assistant." }, { "role": "user", "content": "Hello!" }]
        }


        console.log(JSON.stringify(requestBody));
        console.log(`Bearer ${first}xk8lB0Z7xTZHjC9ET3BlbkFJ2kHqkUxv19VquRs4XOM`);

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Authorization": `Bearer ${first}xk8lB0Z7xTZHjC9ET3BlbkFJ2kHqkUxv19VquRs4XOMS`,
                    "Content-Type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(requestBody),
            });
            const result = await response.json();
            console.log(result);

            console.log(selection);
            console.log(response);
            sendResponse({ body: (selection ? selection : ""), url: window.location.href, subject: document.title });
        } catch (err) {
            console.log(err);
        }
    }
    else
        sendResponse({ body: "" }); // snub them.
});
