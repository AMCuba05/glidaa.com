import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import ResizeObserver from 'resize-observer-polyfill';
import {configureAmplify} from './Funtions/services'
window.ResizeObserver = ResizeObserver;

const App = require('./App').default;
configureAmplify();
ReactDOM.render(
      <App />
  ,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
