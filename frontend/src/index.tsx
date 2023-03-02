import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  // Strict mode checks that the life cycle methods will function correctly in React concurrent mode.
  //React concurrent mode is a set of features that help React apps stay responsive, even when network speeds are slow
  //More information on concurrent mode can be found at https://reactjs.org/docs/concurrent-mode-intro.html
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
