import React from "react";

class CustomTestInput extends React.Component{
  constructor(props){
    super(props)
    this.textInput = React.createRef();
  }

  focusTestInput(){
    this.textInput.current.focus();
  }
  render(){
    return (
      <div>
        <input 
          type="text" 
          ref={this.textInput}
        ></input>
        <input 
          type="button" 
          onClick={()=>{this.focusTestInput()}}
        ></input>
        
      </div>
    )
  }
}

export default CustomTestInput;
