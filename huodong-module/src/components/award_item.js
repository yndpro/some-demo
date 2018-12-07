import React from 'react';
import API from '../assets/js/api';
import {PopupView} from './PopView';

var ExchangeItem = React.createClass({
    getInitialState : function(){
        return {
            img : this.props.item.img,
            detail : this.props.item.detail,
            stage : this.props.item.stage
        }
    },

    detailHandle : function(){
        PopupView.awardList({list : this.props.item.detail.split("|")});
    },
    
    render : function(){
        let {img,detail,stage} = this.state;
        return (
            <li className="ssjl-item">
                <a href="javascript:;" className="item-cover" onClick={this.detailHandle}>
                    <p className="item-int">{stage}</p>
                    <div className="item-spin">
                        <img className="item-img" src={img} alt=""/>
                        <p className="item-more" data-detail={detail}>人均一份</p>
                    </div>
                </a>
                <a href="javascript:;" className="item-dh" onClick={this.detailHandle}>查看详情</a>
            </li>
        )
    }
})

module.exports = ExchangeItem;