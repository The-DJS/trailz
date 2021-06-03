/* eslint-disable import/extensions */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { AppProvider } from './context/context.jsx';

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById('trailz')
);
