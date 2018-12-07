import React from 'react';
import {PopupView} from './PopView';
import Copy from './copy';
import './dialog.scss';

var DialogGiftCode = React.createClass({

    render : function(){
        let {code,name} = this.props;
        
        return (
            <div className="dialog-cont">
                <h3 className="dialog-title">恭喜您，获得<span>【{name}】</span></h3>
                {ztInfo.deadline ? <div className="giftCode-tip">（礼包兑换码有效截止{ztInfo.deadline}，逾期作废）</div> : ""}
                <Copy code={code}/>
                <div className="dialog-opt">
                    {/* <a href={} target="_href" className="dialog-btn">立即兑换</a> */}
                    <a href="javascript:;" className="dialog-btn j-confirm">确定</a>
                </div>
                {/* <a href="javascript:;" target="_blank" className="giftCode-link" onClick={()=>PopupView.tip("礼包使用方法礼包使用方法")}>礼包使用方法》》</a> */}
            </div>
        )
    }
})

module.exports = DialogGiftCode;