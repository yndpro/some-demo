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

const todosData = (state = [],action) => {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    id : id++,
                    text : action.text,
                    complete : false
                }
            ]
        case TOGGLE_TODO:
            return state.map(todo => todo.id === action.id ? {
                ...todo,
                complete : !todo.complete
            } : todo)
        default:
            return state;
    }
}

const todos = (state = initialStatus,action) => {
    switch (action.type) {
        case FETCH_TODOS_START:
            return {
                ...state,
                isFetching : true
            }
        case FETCH_TODOS_SUCCESS:
            return {
                ...state,
                isFetching : false,
                data : action.data
            };
        case FETCH_TODOS_FAILURE:
            return {
                ...state,
                isFetching : false,
                errText : action.errMsg
            }
        default:
            return {
                ...state,
                data : todosData(state.data,action)
            };
    }
}

export default todos;


