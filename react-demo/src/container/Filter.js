import React, { Component } from 'react';
import { connect } from "react-redux";
import Filter from "../components/Filter";
import { setFilter } from "../actions/index";

const mapDispatchToProps = dispatch => ({
    setFilter : filter => dispatch(setFilter(filter))
})

const Filter = connect(
    null,
    mapDispatchToProps
)(Filter)

export default Filter;