import React, { Component } from 'react';
import { connect } from "react-redux";
import { addTodo } from "../actions/index";

let AddTodo = ({dispatch}) => {
    let input;
    return (
        <div>
            <input type="text" ref={node => input = node}/>
            <button onClick={e => {
                if(!input.value.trim()){
                    return
                }
                dispatch(addTodo(input.value));
                input.value = '';
            }}>add</button>
        </div>
    )
}

AddTodo = connect()(AddTodo)

export default AddTodo;