import React from 'react';
import { render } from 'react-dom';

import './static/css/reset.css';
import './static/css/common.css';

import Main from'./components/main.js';


render(
    <Main/>,
    document.getElementById('root')
)