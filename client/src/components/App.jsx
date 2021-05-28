/* eslint-disable import/extensions */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar.jsx';

const App = () => (
  <BrowserRouter>
    <div>
      <NavBar />
    </div>
  </BrowserRouter>
);

export default App;
