import React, { Component } from 'react';

export const transPropsHOC = Component => ComponentProps => {
    let newProps = {};
    console.log(ComponentProps);
    return <Component {...newProps}/>
}