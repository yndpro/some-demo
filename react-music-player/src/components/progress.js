import React from 'react';
import './progess.scss';

let Progess = React.createClass({

    changeProgress : function(e){
        let progessBar = this.refs.progessBar;
        let progress = (e.clientX - progessBar.getBoundingClientRect().left)/progessBar.clientWidth * 100;
        this.props.callbackChangeProgress && this.props.callbackChangeProgress(progress);
    },
    render : function(){
        
        return (
            <div className="progess-bar" ref="progessBar" onClick={this.changeProgress}>
                <div className="progress" style={{width:`${this.props.progress}%`}}></div>
            </div>
        )
    }
});

export default Progess;