import React from 'react';
import { render } from 'react-dom';
import './assets/js/util';
import './assets/js/common';
import './assets/js/ClientBox';
import './assets/js/ClientYoupai';
import './assets/js/Wap';
import './assets/js/mock';
import App from './containers/app';

render(
    <App/>,
    document.getElementById('root')
)