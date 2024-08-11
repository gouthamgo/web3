import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Buffer } from 'buffer';

// Make Buffer available globally
window.Buffer = Buffer;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);