import 'core-js/es6';
import 'raf/polyfill';

import { render } from 'react-dom';
import React from 'react';
import App from './app';
// import Styles from 'STYLES/index.css';

const rootEl = document.getElementById('root');

render( <App/> , rootEl);
