/*global chrome*/
// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
// import { handleReadButtonClick } from '../public/content';

function App() {
  const [selectedText, setSelectedText] = useState('');

  const handleReadButtonClick = () => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, "getSelectedText" , function(response) {
        alert(response);
        setSelectedText(response.selectedText);
      }); 
    });
  };

  return (
    <div className="App">
      <button onClick={handleReadButtonClick}>Read Highlighted Text</button>
      <div>{selectedText}</div>
    </div>
  );

}

export default App;
