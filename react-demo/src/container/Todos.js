import React, { Component } from 'react';
import { connect } from "react-redux";
import Todos from "../components/Todos";
import { toggleTodo , fetchTodos } from "../actions/index";
import { getVisibleTodos } from "../selectors/index";

const mapStateToProps = state => ({
    todos : getVisibleTodos(state).toJS()
})

const mapDispatchToProps = dispatch => ({
    fetchTodos : () => dispatch(fetchTodos()),
    onTodoClick : id => dispatch(toggleTodo(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Todos);