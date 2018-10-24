import React from 'react';
import { render } from 'react-dom';
import './util';
import './mock';
import App from './containers/app';

render(
    <App/>,
    document.getElementById('root')
)