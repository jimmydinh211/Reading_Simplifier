const getSelectedText = () => window.getSelection().toString();

debugger;

document.addEventListener("selectionchange", () => {
  console.log(document.getSelection());
});