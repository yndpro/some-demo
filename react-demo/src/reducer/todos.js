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

const todos = (todos = initialStatus,action) => {
    switch (action.type) {
        case FETCH_TODOS_START:
            return {
                isFetching : true,
                ...todos
            }
        case FETCH_TODOS_SUCCESS:
            return {
                isFetching : false,
                data : todosData(todos.data,action),
                ...todos
            }
        case FETCH_TODOS_FAILURE:
            return {
                isFetching : false,
                errText : action.errMsg,
                ...todos
            }
        default:
            return todos;
    }
}

const todosData = (data,action) => {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...data,
                {
                    id : id++,
                    text : action.text,
                    complete : false
                }
            ]
        case TOGGLE_TODO:
            return data.map(todo => todo.id === action.id ? {
                ...todo,
                complete : !todo.complete
            } : todo)
        default:
            return data;
    }
}

export default todos;


