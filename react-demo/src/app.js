import React, { Component } from "react";
import Todos from "./container/Todos";
import Footer from "./container/Footer";
import AddTodo from "./container/AddTodo";

const App = () => (
  <div className="view">
    <AddTodo />
    <Todos />
    <Footer />
  </div>
);

export default App;
