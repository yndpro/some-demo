import React, { Component } from 'react';
import Todos from './container/Todos';
import Filter from './container/Filter';
import AddTodo from './container/AddTodo';

const App = () => (
    <div className="view">
        <AddTodo/>
        <Todos/>
        <Filter/>
    </div> 
)

export default App;