import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // Note: Strict mode:
  // checks that the life cycle methods will function correctly in React concurrent mode.
  // checks also warn about usage of old APIs, such as the old context API.
  // checks for unexpected side effects. Memory leaks and invalid application state are also covered in these checks.
  // checks only happen in development mode – they do not impact a production build.

  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
