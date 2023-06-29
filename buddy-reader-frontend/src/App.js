import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import TextBox from './Components/TextBox';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<TextBox />} />
      </Routes>
    </Router>
  );
}

export default App;
