import React from 'react';
import Header from './header';
import Progress from './progress';

let Main = React.createClass({
    render(){
        return (
            <div className="">
                <Header/>
                <Progress/>
            </div>
        )
    }
});

export default Main;