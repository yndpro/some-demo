import React, { Component } from 'react';
import { connect } from "react-redux";
import AddTodo from '../components/AddTodo';
import { setText , addTodo } from "../actions/index";
import { getText } from '../selectors/index';

const mapStateToProps = state => ({
    text : getText(state)
})

const mapDispatchToProps = dispatch => ({
    setText : text => dispatch(setText(text)),
    addTodo : text => dispatch(addTodo(text)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTodo);
