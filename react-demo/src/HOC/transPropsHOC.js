import React, { Component } from 'react';
import {isImmutable} from 'immutable';


export const toJS = Component => ComponentProps => {
    const KEY = 0;
    const VALUE = 1;
    let newProps = Object.entries(ComponentProps).reduce((newProps,ComponentProp) => {
        newProps[ComponentProp[KEY]] = isImmutable(ComponentProp[VALUE]) ?
        ComponentProp[VALUE].toJS()
        :
        ComponentProp[VALUE];
        return newProps;
    },{})
    return <Component {...newProps}/>
}