import { 
    SET_FILTER
} from '../actions/actionTypes';

const filter = (filter = '',action) => {
    switch (action.type) {
        case SET_FILTER:
            return action.filter
        default:
            return filter;
    }
}

export default filter;


