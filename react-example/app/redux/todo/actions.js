import { ADD_TODO, TOGGLE_TODO, FETCH_TODOS_START, FETCH_TODOS_SUCCESS, FETCH_TODOS_FAILURE } from './actionTypes';

export const fetchTodosStart = () => ({
    type: FETCH_TODOS_START
});

export const fetchTodosSuccess = (data) => ({
    type: FETCH_TODOS_SUCCESS,
    payload: {
        data: data
    }
});

export const fetchTodosFailure = (errMsg) => ({
    type: FETCH_TODOS_FAILURE,
    payload: {
        errMsg: errMsg
    }
});

export const fetchTodos = () => {
    return (dispatch) => {
        dispatch(fetchTodosStart());
        return fetch('/api/todo')
            .then((res) => res.json())
            .then((data) => {
                dispatch(fetchTodosSuccess(data.data));
            })
            .catch((reason) => {
                dispatch(fetchTodosFailure(reason));
                console.log(reason);
            });
    };
};

export const addTodo = (text) => ({
    type: ADD_TODO,
    payload: {
        text: text
    }
});

export const toggleTodo = (id) => ({
    type: TOGGLE_TODO,
    payload: {
        id: id
    }
});
