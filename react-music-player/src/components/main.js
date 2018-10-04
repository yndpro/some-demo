import React from 'react';
import Header from './header';
import Progress from './progress';

var Main = React.createClass({
    getInitialState : function(){
        return {
            progress : '0'
        }
    },

    componentDidMount : function(){
        $('#player').jPlayer({
            supplied:'mp3',
            wmode:'window',
            ready : function(){
                $(this).jPlayer('setMedia',{
                    mp3: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3'
                }).jPlayer('play');
                
            }
        });
        $('#player').bind($.jPlayer.event.timeupdate,(e)=>{
            this.setState({
                progress : e.jPlayer.status.currentPercentAbsolute
            })
        });
    },

    componentWillUnMount : function(){
        $('#player').unbind($.jPlayer.event.timeupdate)
    },

    callbackChangeProgress : function(progress){
        this.setState({
            progress : progress
        })
    },

    render : function(){
        return (
            <div className="">
                <Header/>
                <Progress 
                    progress={this.state.progress} 
                    callbackChangeProgress={this.callbackChangeProgress}
                />
            </div>
        )
    }
});

export default Main;