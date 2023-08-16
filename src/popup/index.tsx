import React from 'react';
import ReactDOM from 'react-dom/client';
import Popup from './popup';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// Neviem prečo sa to prepisuje takto: - lebo vyskakuje hláška že je nebezpečné renderovať do body
const root = document.createElement("div")
root.className = "container"
document.body.appendChild(root)
const rootDiv = ReactDOM.createRoot(root);
//root.render(
  rootDiv.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
