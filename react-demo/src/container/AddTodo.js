import React, { Component } from 'react';
import { connect } from "react-redux";
import { setText , addTodo } from "../actions/index";
import AddTodo from '../components/AddTodo';

const mapStateToProps = state => ({
    text : state.text
})

const mapDispatchToProps = dispatch => ({
    setText : text => dispatch(setText(text)),
    addTodo : text => dispatch(addTodo(text)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTodo);