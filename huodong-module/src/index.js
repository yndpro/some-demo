import React from 'react';
import { render } from 'react-dom';
import './assets/js/global';
import './assets/js/mock';
if(process.env.NODE_ENV === "development"){
    const VConsole = require('vconsole');
    const vConsole = new VConsole();
}
import App from './containers/app';

render(
    <App/>,
    document.getElementById('root')
)
document.getElementById("loadingBox").style.opacity = "0";