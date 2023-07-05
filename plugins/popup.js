const TranslateButton = document.getElementById("TranslateButton");
const GradeSelect = document.getElementById("GradeSelect");

TranslateButton.onclick = async function (e) {
  let queryOptions = { active: true, currentWindow: true };
  let tabs = await chrome.tabs.query(queryOptions);

  console.log(`Selected grade is ${GradeSelect.value}`);

  await chrome.runtime.sendMessage(
    "DoTranslate"
  );
};