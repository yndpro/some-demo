import React from 'react';
import Pubsub from 'pubsub-js';
import './dialog.scss';

var DialogForm = React.createClass({

    submitForm : function(){
        let item = {};
        let form = document.querySelector(".j-form");
        
        item.id = form["id"].value;
        item.uinfo = {
            uname : form["uname"].value,
            uphone : form["uphone"].value,
            uaddress : form["uaddress"].value
        }
        Pubsub.publish("DIALOG_FORM_SUBMIT",item);   
    },

    render : function(){
       let item = this.props.item;

        return (
            <div className="dialog-cont dialog-form">
                <div className="dialog-title">收件信息</div>
                <div className="clearfix">
                    <form className="j-form">
                        {!item.uinfo ?
                        <input type="hidden" name="id" value={item.id}/>
                        :
                        null
                        }
                        <div className="form-item form-item1">
                            <label for="" className="form-label">姓名：</label>
                            {item.uinfo ? 
                            <input type="text" name="uname" className="form-input" ref="uname" value={item.uinfo.uname} readOnly/>
                            :
                            <input type="text" name="uname" className="form-input"/>}
                        </div>
                        <div className="form-item form-item2">
                            <label for="" className="form-label">手机号码：</label>
                            {item.uinfo ? 
                            <input type="text" name="uphone" className="form-input" ref="uphone" value={item.uinfo.uphone} readOnly/>
                            :
                            <input type="text" name="uphone" className="form-input"/>}
                        </div>
                        <div className="form-item form-item3">
                            <label for="" className="form-label">详细的住址：</label>
                            {item.uinfo ? 
                            <textarea name="uaddress" className="form-textarea" id="" cols="30" rows="3" readOnly>{item.uinfo.uaddress}</textarea>
                            :
                            <textarea name="uaddress" className="form-textarea" id="" cols="30" rows="3" placeholder="建议您如实填写详细收货地址。列如：省、市、城、镇、区、街道（村）名称、门牌号码、楼层和房间号等信息。"></textarea>}
                        </div>
                    </form>
                </div>
                <div className="dialog-tips">（注：信息提交后无法修改，请谨慎填写确保送达）</div>
                <div className="dialog-opt">
                    {item.uinfo ? 
                    <a href="javascript:;" className="dialog-btn j-confirm">确定</a>
                    :
                    <input type="submit" className="dialog-btn j-submit" value="确定" onClick={this.submitForm.bind(this)}/>}
                </div>
            </div>
        )
    }
})

module.exports =  DialogForm;