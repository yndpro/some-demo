import {fromJS} from 'immutable';
import { 
    ADD_TODO,
    TOGGLE_TODO,
    FETCH_TODOS_START,
    FETCH_TODOS_SUCCESS,
    FETCH_TODOS_FAILURE
} from '../actions/actionTypes';

let id = 0;

const initialStatus = {
    isFetching : false,
    data : [],
    errText : ""
}


const todosData = (state = fromJS([]),action) => {
    switch (action.type) {
        case ADD_TODO:
            return state.push(fromJS({
                id : id++,
                text : action.text,
                complete : false
            }));
        case TOGGLE_TODO:
            return state.map(todo => todo.get("id") === action.id ? todo.set("complete",!todo.get("complete")) : todo)
        default:
            return state;
    }
}

const todos = (state = fromJS(initialStatus),action) => {
    switch (action.type) {
        case FETCH_TODOS_START:
            return state.set("isFetching",true);
        case FETCH_TODOS_SUCCESS:
            return state.merge({
                isFetching : false,
                data : fromJS(action.data)
            })
        case FETCH_TODOS_FAILURE:
            return state.merge({
                isFetching : false,
                errText : action.errMsg
            })
        default:
            return state.set("data",todosData(state.get("data"),action))
    }
}

export default todos;


