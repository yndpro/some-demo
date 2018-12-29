import React from 'react';
import './loadings-ellipsis.scss';

var LoadingEllipsis = React.createClass({
    render : function(){
        return (
            <div className="loadings loadings-ellipsis"><div></div><div></div><div></div><div></div></div>
        )
    }
})

module.exports = LoadingEllipsis;