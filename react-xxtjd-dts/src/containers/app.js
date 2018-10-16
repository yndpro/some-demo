import React from 'react';
import 'app.scss';

var App = React.createClass({
    render : function(){
        return (
            <div className="view">
                <div class="wrap">
                    <div class="head">
                        <div class="bg1"></div>
                        <div class="bg2"></div>
                        <div class="bg3"></div>
                    </div>
                    <div class="container">
                        <Download />
                    </div>
                    <div class="footer">本活动最终解释权归赛事举办方所有</div>
                </div>
            </div>
        )
    }
})

module.exports = App;