import React from 'react';
import {PopupView} from './PopView';
import './dialog.scss';

var DialogGiftNormal = React.createClass({

    render : function(){
        let {name} = this.props;
        
        return (
            <div className="dialog-cont">
                <h3 className="dialog-title">恭喜您，获得<span>【{name}】</span></h3>
                <div className="dialog-opt">
                    <a href="javascript:;" className="dialog-btn j-confirm">确定</a>
                </div>
            </div>
        )
    }
})

module.exports = DialogGiftNormal;