import React, { Component } from "react";
import Todos from "./container/Todos";
import Footer from "./container/Footer";
import AddTodo from "./container/AddTodo";
import Hooks from "./container/Hooks";
// import ContextApp from "./container/context/App";
// import AutoFocusTextInput from "./container/refs/AutoFocusTextInput";

const App = () => (
  <div className="view">
    <AddTodo />
    <Todos />
    <Footer />
    {/* <AutoFocusTextInput></AutoFocusTextInput> */}
    {/* <Hooks/> */}
  </div>
);

export default App;
