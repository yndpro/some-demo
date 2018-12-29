import React from 'react';
import API from '../assets/js/api';
import Pubsub from 'pubsub-js';
import {PopupView} from './PopView';
import Dialog from './dialog';
import './dialog.scss';

var DialogForm = React.createClass({

    handleChange : function(e){
        this.state.uinfo[e.target.name] = e.target.value;
        this.setState({
            uinfo : this.state.uinfo
        })
    },

    handleSubmit : function(){
        let validate = true,
            item = this.state;

        for(let key in item.uinfo){
            if(item.uinfo[key] == ""){ 
                PopupView.tip("请填写完整信息");
                validate = false;
                return false;
            }
        }

        if(!/^0?(13|14|15|17|18)[0-9]{9}$/.test(item.uinfo.uphone)){
            PopupView.tip("请填写正确的电话号码");
            validate = false;
            return false;
        }

        if(validate){
            Ajax.post(API.writeUserInfo,{
                id:item.id,
                uname:item.uinfo.uname,
                uphone:item.uinfo.uphone,
                uaddress:item.uinfo.uaddress
            }).then(response => {
                if(response.status == 1){
                    PopupView.tip(response.msg);
                    Dialog.list["j-form_popup"].close();
                    Pubsub.publish("DIALOG_FORM_SUBMIT_SUCCESS",item);
                    return false
                }
                if(response.status < 0){
                    PopupView.tip(response.msg)
                    return false
                }
            });
        }
    },

    getInitialState : function(){
        let item = this.props.item;
        return {
            id : item.id ? item.id : "",
            uinfo : {
                uname : item.uinfo ? item.uinfo.uname : "",
                uphone : item.uinfo ? item.uinfo.uphone : "",
                uaddress : item.uinfo ? item.uinfo.uaddress : ""
            }
        }
    },

    render : function(){
        let item = this.state;
        return (
            <div className="dialog-cont">
                {this.props.item.fst == 1 ? 
                <div className="dialog-title">恭喜您获得了<span>{this.props.item.prizeName}</span></div>
                :
                <div className="dialog-title">收件信息</div>
                }
                <div className="dialog-form">
                    <form>
                        <div className="form-item form-item1">
                            <label htmlFor="" className="form-label">姓名：</label>
                            {this.props.item.uinfo ? 
                            <input type="text" name="uname" className="form-input" value={item.uinfo.uname} readOnly/>
                            :
                            <input type="text" name="uname" className="form-input" value={item.uinfo.uname} onChange={this.handleChange}/>}
                        </div>
                        <div className="form-item form-item2">
                            <label htmlFor="" className="form-label">手机号码：</label>
                            {this.props.item.uinfo ? 
                            <input type="text" name="uphone" className="form-input" value={item.uinfo.uphone} readOnly/>
                            :
                            <input type="text" name="uphone" className="form-input" value={item.uinfo.uphone} onChange={this.handleChange}/>}
                        </div>
                        <div className="form-item form-item3">
                            <label htmlFor="" className="form-label">详细的住址：</label>
                            {this.props.item.uinfo ? 
                            <textarea name="uaddress" className="form-textarea" id="" cols="30" rows="3" value={item.uinfo.uaddress} readOnly/>
                            :
                            <textarea name="uaddress" className="form-textarea" id="" cols="30" rows="3" value={item.uinfo.uaddress} onChange={this.handleChange} placeholder="建议您如实填写详细收货地址。列如：省、市、城、镇、区、街道（村）名称、门牌号码、楼层和房间号等信息。"></textarea>}
                        </div>
                    </form>
                </div>
                <div className="dialog-tips">（注：信息提交后无法修改，请谨慎填写确保送达）</div>
                <div className="dialog-opt">
                    {this.props.item.uinfo ? 
                    <a  className="dialog-btn j-confirm">确定</a>
                    :
                    <input type="submit" className="dialog-btn j-submit" value="确定" onClick={this.handleSubmit}/>}
                </div>
            </div>
        )
    }
})

module.exports =  DialogForm;