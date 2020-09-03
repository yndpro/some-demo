import React, { Component } from 'react';
import { connect } from "react-redux";
import Todos from "../components/Todos";
import { toggleTodo , fetchTodos } from "../actions/index";

const getVisibleTodos = (todos,filter) => {
    switch (filter) {
        case 'COMLETED': 
            return todos.filter(todo => todo.complete === true)
        case 'UNCOMLETED': 
            return todos.filter(todo => todo.complete !== true)
        default:
            return todos;
    }
}

const mapStateToProps = state => ({
    todos : getVisibleTodos(state.todos,state.filter)
})

const mapDispatchToProps = dispatch => ({
    fetchTodos : () => dispatch(fetchTodos()),
    onTodoClick : id => dispatch(toggleTodo(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Todos);