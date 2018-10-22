import '../mock.js';
import React from 'react';
import {Ajax} from '../util';
import Download from '../components/download';
import './app.scss';
import axios from 'axios';


var App = React.createClass({

    getInitialState : function(){
        return {
            userInfo : {
                scookie : "",
                uid : "",
                nick : "",
                avatar : "",
                level : ""
            }
        }
    },

    componentDidMount : function(){
        Ajax.post('/cn/xxtjd/dts-ajaxInitBx',{},this.state.userInfo)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        
    },

    render : function(){
        return (
            <div className="view">
                <div className="wrap">
                    <div className="head">
                        <div className="bg1"></div>
                        <div className="bg2"></div>
                        <div className="bg3"></div>
                    </div>
                    <div className="container">
                        <Download />
                    </div>
                    <div className="footer">本活动最终解释权归赛事举办方所有</div>
                </div>
            </div>
        )
    }
})

module.exports = App;