import React from 'react';
import CountDown from './components/CountDown';

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            last_time : 10 * 60
        };
    }
    render(){
        return (
            <div className="view">
                <CountDown time={this.state.last_time}></CountDown>
            </div> 
        )
    }
};

export default App;