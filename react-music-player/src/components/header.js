import React from 'react';
import '../static/css/header.scss';

let Header = React.createClass({
    render(){
        return (
            <div className="header row">
                <img src="../static/images/logo.png" alt="" className="header-logo -col-auto"/>
                <h1 className="header-title">React Music Player</h1>
            </div>
        )
    }
});

export default Header;