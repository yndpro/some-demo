import { 
    SET_TEXT
} from '../actions/actionTypes';

const text = (text = '',action) => {
    switch (action.type) {
        case SET_TEXT:
            return action.text
        default:
            return text;
    }
}

export default text;


