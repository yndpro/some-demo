import React from 'react';
import './download.scss';

var Download = React.createClass({
    render : function(){
        return (
            <a href="javascript:;" target="_blank" className="btn--download">游戏下载</a>
        )
    }
})

module.exports = Download;