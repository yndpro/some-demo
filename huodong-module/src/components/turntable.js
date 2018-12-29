import React from 'react';
import Pubsub from 'pubsub-js';
import './turntable.scss';

var Turntable = React.createClass({
    getInitialState : function(){
        return {
            rotate : 0
        }
    },
    local : {
        second : 6,
        angle : 0,
        defaultTurn : 5,
        orientation : 1
    },
    start : function(){
        let {angle,defaultTurn,orientation,second} = this.local;
        let index = this.props.index;
        let realAngle = orientation == 1 ? (360 -  angle * index) : (angle * index);
        let rotate =  this.state.rotate - (this.state.rotate % 360) + (orientation * (defaultTurn * 360 + realAngle));

        this.setState({
            rotate : rotate
        });
        setTimeout(function(){
            Pubsub.publish("LOTTERY_STOP");
        }.bind(this),(second + 1) * 1000)
    },
    componentWillMount : function(){
        let {prizes} = this.props;
        this.local.angle = 360 / prizes.length;
    },
    componentDidMount : function(){
        Pubsub.subscribe("LOTTERY_START",(msg) => {
            this.start();
        });
    },
    componentWillUnmount : function(){
        Pubsub.unsubscribe("LOTTERY_START");
    },
    render : function(){
        let {prizes} = this.props;
        return (
            <ul className="lotte-table" style={{transform:`rotate(${this.state.rotate}deg)`}}>
            {
                prizes.map((item,index) => 
                    <li key={index} style={{transform:`rotate(${this.local.angle * index}deg)`}}>
                        <div className="item-img"><img alt={item.name} src={item.pic} /></div>
                        <div className="item-txt">{item.name}</div>
                    </li>
                )
            }
            </ul>
        )
    }
})

module.exports = Turntable;