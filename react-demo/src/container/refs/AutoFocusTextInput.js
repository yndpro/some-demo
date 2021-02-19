import React from "react";
import CustomTextInput from './CustomTextInput'
import FancyButton from './FancyButton'

class AutoFocusTextInput extends React.Component{
  constructor(props){
    super(props)
    //创建ref （引用）
    this.textInput = React.createRef();
    this.fancyButtonRef = React.createRef();
  }
  componentDidMount(){
    this.textInput.current.focusTestInput();

    console.log(this.fancyButtonRef.current);
  }
  render(){
    // 告诉 React 我们想把 <input> ref 关联到
    // 构造器里创建的 `textInput` 上
    return (
      <div>
        <CustomTextInput ref={this.textInput}></CustomTextInput>
        <FancyButton ref={this.fancyButtonRef}>
          <span>ref转发</span>
        </FancyButton>
      </div>
    )
  }
}

export default AutoFocusTextInput;
