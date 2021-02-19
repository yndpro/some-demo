import React from 'react';
import {ThemeContext} from './contest';

let ThemedButton = (props) => {
console.log(props)    
    return (
        <ThemeContext.Consumer>
            {theme => <a>{theme}</a>}
        </ThemeContext.Consumer>
    )
}

export default ThemedButton;