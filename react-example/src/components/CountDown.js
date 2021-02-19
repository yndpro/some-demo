import React from 'react';

class CountDown extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            time : "0:0:0"
        };
    }
    addZero(i){
        return i < 10 ? "0" + i: i + "";
    }
    countDown(time){
        time = parseInt((time - 1));
        let d = parseInt(time / (60 * 60 * 24));
        let h = parseInt(time / 60 / 60 % 24);
        let m = parseInt(time / 60 % 60);
        let s = parseInt(time % 60);
        d = this.addZero(d)
        h = this.addZero(h);
        m = this.addZero(m);
        s = this.addZero(s);
        this.setState({time : h + ":" + m + ":" + s},()=>{
            if(time <= 0){
                window.location.reload()
                return
            }else{
                this.timer = setTimeout(() => {
                    this.countDown(time);
                }, 1000);
            }
        });
    }
    start(){
        //if(!this.startCount && this.props.time > 0){
            this.countDown(this.props.time);
        //     this.startCount = true;
        // }
    }
    componentDidMount(){
        //this.startCount = false;
        this.start();
    }
    componentWillUnmount(){
        clearTimeout(this.timer);
        //this.startCount = false;
    }
    // componentWillReceiveProps(){
    //     this.start();
    // }
    render(){
        return <span>{this.state.time}</span>
    }
}

export default CountDown;