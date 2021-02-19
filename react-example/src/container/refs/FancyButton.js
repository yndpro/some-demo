import React from "react";
//ref 转发到DOM
const FancyButton = React.forwardRef((props,ref) => {
  return <button ref={ref}>
    {props.children}
  </button>
})

export default FancyButton;
