import React from 'react';

var Copy = React.createClass({
    componentDidMount : function(){
        let {code} = this.props; 
        
        if(ztInfo.terminal == CONFIG.WAP){
            Wap.copy("#j-copy-btn");
        }
        if(ztInfo.terminal == CONFIG.BOX){
            document.querySelector("#j-copy-btn").addEventListener("click",() => {
                ClientBox.copy(code);
            });
        }
        if(ztInfo.terminal == CONFIG.YOUPAI){
            document.querySelector("#j-copy-btn").addEventListener("click",() => {
                ClientYoupai.copy(code);
            });
        }
    },
    render : function(){
        let {code} = this.props;
        
        return (
            <div className="item--award item--copy">
                <label className="item-label">礼包激活码：</label>
                <div className="item-oper">
                    <input className="copy-input" type="text" id="j-copy-code" readOnly value={code}/>
                    <a className="copy-btn" href="javascript:;" id="j-copy-btn" data-clipboard-target="#j-copy-code">复制</a>
                </div>
            </div>
        )
    }
})

module.exports = Copy;