import React from 'react';
import Pubsub from 'pubsub-js';
import PopupView from './PopView';
import './dialog.scss';
import './myaward.scss';
import './page.scss';

console.log("dialog_myaward",PopupView);

var MyAwardPop = React.createClass({

    changePage : function(direction){
        let {page,pageCount} = this.state;

        this.setState({
            page :  direction == "pre" ? page -= 1 : page += 1
        })
    },

    updateList : function(newItem){
        let index = this.state.list.findIndex((item,index,arr) => item.id == newItem.id);
        
        this.state.list[index].uinfo = newItem.uinfo;

        this.setState({
            list : this.state.list
        })
    },

    handleWriteOrWatchInfo : function(item){
        console.log("handleWriteOrWatchInfo",PopupView);
        PopupView.form({item:item})
        // Pubsub.publish("DIALOG_FORM_OPEN",item);   
    },

    getInitialState : function(){
        return {
            list : this.props.list,
            perPage : this.props.perPage,
            pageCount : Math.ceil(this.props.list.length / this.props.perPage),
            page : 1,
        }
    },
    
    componentDidMount : function(){
        Pubsub.subscribe("MYAWARD_LIST_UPDATE",(msg,newItem) => {
            this.updateList(newItem);
        });
    },

    componentWillUnmount : function(){
        Pubsub.unsubscribe("MYAWARD_LIST_UPDATE");
    },

    render : function(){
       
        const {list,page,perPage,pageCount} = this.state;

        const renderOper = item => {
            if(item.kind == CONFIG.GIFT){
                return <div className="item-oper item--copy">
                            <input className="copy-input" id={`j-copy-code${item.id}`} type="text" value={item.code} readonly="readonly"/>
                            <a href="javascript:;" className="copy-btn" id={`j-copy-btn${item.id}`} data-clipboard-target={`#j-copy-code${item.id}`}>复制</a>
                          </div>
            }else if(item.kind == CONFIG.UNNEED_UINFO){
                return <div className="item-text">(获得的积分可在页面底部进行礼包兑换)</div>
            }else if(item.kind == CONFIG.NEED_UINFO){
                return <a href="javascript:;" className="j-myawardWatch" onClick={() => this.handleWriteOrWatchInfo(item)}>【查看/填写收货地址】</a>
            }else if(item.kind == CONFIG.COLLECTIONS){
                return <a href="javascript:;" className="j-myawardGame">【选择游戏】</a>
            }else{
                return <div></div>
            }
        }

        return (
            <div> 
                <ul className="myaward-list">
                {
                    list.slice((page - 1) * perPage,page * perPage).map(item => 
                        <li className="item--award">
                            <div className="item-label">{item.prizeName}</div>
                            {renderOper(item)}
                        </li>
                    )
                }
                </ul>
                <div className="dialog-pager pager">
                    {page == 1 ? 
                        <span className="pager-pre">上一页</span>
                    :
                        <a className="pager-pre" onClick={() => this.changePage("pre")}>上一页</a>
                    }
                    <span className="pager-count">{page}/{pageCount}</span>
                    {page == pageCount ? 
                        <span className="pager-next">下一页</span>
                    :
                        <a className="pager-next" onClick={() => this.changePage("next")}>下一页</a>
                    }
                </div>
                <div className="dialog-opt">
                    <a href="javascript:;" className="dialog-btn j-confirm">确 定</a>
                </div>
            </div>
        )
    }
})

module.exports =  MyAwardPop;