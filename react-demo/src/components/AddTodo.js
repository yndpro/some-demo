import React, { Component } from 'react';
import { connect } from "react-redux";

let AddTodo = ({setText,addTodo,text}) => {
    let input;
    return (
        <div>
            <input type="text" value={text} onChange={e=>{setText(e.target.value)}} ref={node => input = node}/>
            <button onClick={e => {
                if(!input.value.trim()){
                    return
                }
                addTodo(input.value);
                input.value = '';
            }}>add</button>
        </div>
    )
}

AddTodo = connect()(AddTodo)

export default AddTodo;