import React, { Component } from 'react';
import { connect } from "react-redux";
import Filter from "../components/Filter";
import { setFilter } from "../actions/index";

const mapStateToProps = state => ({
    filter : state.filter
})

const mapDispatchToProps = dispatch => ({
    setFilter : filter => dispatch(setFilter(filter))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filter);