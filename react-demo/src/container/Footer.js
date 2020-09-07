import React, { Component } from 'react';
import { connect } from "react-redux";
import Filter from "../components/Filter";
import { getFilter } from '../selectors/index';
import { setFilter } from "../actions/index";

const mapStateToProps = state => {
    return {
        filter : getFilter(state)
    }
}

const mapDispatchToProps = dispatch => ({
    setFilter : filter => dispatch(setFilter(filter))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filter);