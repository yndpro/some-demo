import { SET_TEXT } from './actionTypes';

export const setText = (text) => ({
    type: SET_TEXT,
    payload: {
        text: text
    }
});
