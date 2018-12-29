import React from 'react';
import '../components/copy.scss';

var Copy = React.createClass({
    getDefaultProps : function(){
        return {
            id : "5201314"
        }
    },
    componentDidMount : function(){
        let {code,id} = this.props; 
        
        if(ztInfo.terminal == CONFIG.WAP){
            console.log(id);
            Wap.copy(`#j-copy-btn${id}`);
        }
        if(ztInfo.terminal == CONFIG.BOX){
            document.querySelector(`#j-copy-btn${id}`).addEventListener("click",() => {
                ClientBox.copy(code);
            });
        }
        if(ztInfo.terminal == CONFIG.YOUPAI){
            document.querySelector(`#j-copy-btn${id}`).addEventListener("click",() => {
                ClientYoupai.copy(code);
            });
        }
    },
    componentWillUnmount : function(){
        let {id} = this.props; 
        if(ztInfo.terminal == CONFIG.WAP){
            console.log(Wap._copy[`#j-copy-btn${id}`]);
            Wap._copy[`#j-copy-btn${id}`].destroy();
            Wap._copy[`#j-copy-btn${id}`]= null;
        }
    },
    render : function(){
        let {code,id} = this.props;
        
        return (
            <div className="item-oper copy">
                <input className="copy-input" type="text" id={`j-copy-code${id}`} readOnly value={code}/>
                <a className="copy-btn" href="javascript:;" id={`j-copy-btn${id}`} data-clipboard-target={`#j-copy-code${id}`}>复制</a>
            </div>
        )
    }
})

module.exports = Copy;