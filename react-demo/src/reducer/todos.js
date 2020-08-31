import { 
    ADD_TODO,
    TOGGLE_TODO
} from '../actions/actionTypes';

let id = 0;

const todos = (todos = [],action) => {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...todos,
                {
                    id : id++,
                    text : action.text,
                    complete : false
                }
            ]
        case TOGGLE_TODO:
            return todos.map(todo => todo.id === action.id ? {
                ...todo,
                complete : !todo.complete
            } : todo)
        default:
            return todos;
    }
}

export default todos;


