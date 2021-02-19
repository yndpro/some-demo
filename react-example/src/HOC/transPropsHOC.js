import React, { Component } from 'react';
import {isImmutable} from 'immutable';


export const toJS = Component => ComponentProps => {
    const KEY = 0;
    const VALUE = 1;
    // console.log("s",ComponentProps);
    let newProps = Object.entries(ComponentProps).reduce((newProps,ComponentProp) => {
        newProps[ComponentProp[KEY]] = isImmutable(ComponentProp[VALUE]) ?
        ComponentProp[VALUE].toJS()
        :
        ComponentProp[VALUE];
        return newProps;
    },{})
    return <Component {...newProps}/>
}
//HOC
//作为函数（组件）返回  *理解为嵌套组件返回一个新的组件（函数）而不是返回一个原本的组件    进行实例化