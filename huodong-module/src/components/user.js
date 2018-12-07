import React from 'react';
import './user.scss';

var User = React.createClass({

    handleLogin : function(){
        if(ztInfo.terminal == CONFIG.WAP){
            Wap.login();
        }
        if(ztInfo.terminal == CONFIG.BOX){
            ClientBox.login();
        }
        if(ztInfo.terminal == CONFIG.YOUPAI){
            ClientYoupai.login();
        }
        return false;
    },

    render : function(){
        return (
            <div className="ssjc-user user">
                {userInfo.uid > 0 ? 
                <div className="user-log">
                    <span className="user-greet">您好，</span>
                    <span className="user-name" title="">{userInfo.nick}</span>
                    {ztInfo.terminal == CONFIG.WAP ? <a href="javascript:;" className="user-logout" onClick={()=>Wap.logout()}>【退出】</a> : ""}
                </div>
                :
                <div className="user-ulog">
                    <a href="javascript:;" className="user-login" onClick={this.handleLogin}>【登录】</a>
                </div>
                }
            </div>
        )
    }
})

module.exports = User;