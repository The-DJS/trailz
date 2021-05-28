/* eslint-disable import/extensions */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './Navbar.jsx';

const App = () => {
  return (
  <BrowserRouter>
    <div>
      <NavBar />
    </div>
  </BrowserRouter>
  )
};

export default App;
