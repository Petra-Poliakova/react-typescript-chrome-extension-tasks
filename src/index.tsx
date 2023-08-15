import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// Neviem prečo sa to prepisuje takto:
const root = document.createElement("div")
root.className = "container"
document.body.appendChild(root)
const rootDiv = ReactDOM.createRoot(root);
//root.render(
  rootDiv.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
