import React from 'react';
import './progess.scss';

let Progess = React.createClass({
    getDefaultProps : function(){
        return {
            progress : '0.5'
        }
    },

    changeProgress : function(e){
        let progessBar = this.refs.progessBar;
        let progress = (e.clientX - progessBar.getBoundingClientRect().left)/progessBar.clientWidth * 100;
        
        this.props.callbackChangeProgress && this.props.callbackChangeProgress(progress);
    },
    render : function(){
        console.log('pro',this.props.progress);
        return (
            <div className="progess-bar" ref="progessBar" onClick={this.changeProgress}>
                <div className="progress" style={{width:`${this.props.progress}%`}}></div>
            </div>
        )
    }
});

export default Progess;