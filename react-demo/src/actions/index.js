
import { 
    ADD_TODO,
    TOGGLE_TODO,
    SET_FILTER,
    FETCH_TODOS_START,
    FETCH_TODOS_SUCCESS,
    FETCH_TODOS_FAILURE,
} from './actionTypes';

export const fetchTodosStart = () => ({
    type : FETCH_TODOS_START
})

export const fetchTodosSuccess = data => ({
    type : FETCH_TODOS_SUCCESS,
    data : data
})
        
export const fetchTodosFailure = errMsg => ({
    type : FETCH_TODOS_FAILURE,
    errMsg : errMsg
})

export const fetchTodos = () => {
    return (dispatch) => {
        dispatch(fetchTodosStart());
        return fetch("../mock/todos.json",{method: "get"}).then(res => {
            res.json().then(data => {
                dispatch(fetchTodosSuccess(data));
            });
        }).then(reason => {
            dispatch(fetchTodosFailure(reason));
            alert(JSON.stringify(reason))
        })
    }
}

export const addTodo = text => ({
    type : ADD_TODO,
    text : text
})

export const toggleTodo = id => ({
    type : TOGGLE_TODO,
    id : id
})

export const setFilter = filter => ({
    type : SET_FILTER,
    filter : filter
})


