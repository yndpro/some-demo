import { SET_TEXT } from './actionTypes';

const actionHandle = {
    [SET_TEXT]: (state, payload) => {
        return payload.text;
    }
};

export default (state = '', action) => {
    return actionHandle[action.type] ? actionHandle[action.type](state, action.payload) : state;
};
