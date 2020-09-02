import React, { Component } from 'react';
import { connect } from "react-redux";
import Todos from "../components/Todos";

const mapStateToProps = state => ({
    todos : state.todos
})

const mapDispatchToProps = dispatch => ({
    setFilter : filter => dispatch(filter)
})

const Todos = connect(
    mapStateToProps,
)(Todos)

export default Todos;