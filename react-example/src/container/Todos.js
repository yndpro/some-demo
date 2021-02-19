import React, { Component } from 'react';
import { connect } from "react-redux";
import Todos from "../components/Todos";
import { toggleTodo , fetchTodos } from "../actions/index";
import { getVisibleTodos } from "../selectors/index";
import { toJS } from "../HOC/transPropsHOC";

const mapStateToProps = state => {
    console.log('mapStateToProps');
    return {
        todos : getVisibleTodos(state)
    }
}

//浅拷贝

const mapDispatchToProps = dispatch => ({
    fetchTodos : () => dispatch(fetchTodos()),
    onTodoClick : id => dispatch(toggleTodo(id))
})

// console.log(Todos);
// console.log(toJS(Todos));

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(toJS(Todos));