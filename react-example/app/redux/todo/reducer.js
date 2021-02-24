import { ADD_TODO, TOGGLE_TODO, FETCH_TODOS_START, FETCH_TODOS_SUCCESS, FETCH_TODOS_FAILURE } from './actionTypes';
import { produce } from 'immer';

let id = 0;

const INITIAL_STATE = {
    isFetching: false,
    data: [],
    errText: ''
};

const todosData = (state = INITIAL_STATE.data, action) => {
    const actionHandle = {
        [ADD_TODO]: (state, payload) =>
            produce(state, (draft) => {
                draft.push({
                    id: id++,
                    text: payload.text,
                    complete: false
                });
            }),
        [TOGGLE_TODO]: (state, payload) =>
            produce(state, (draft) => {
                let todo = draft.find((todo) => todo.id == payload.id);
                todo.complete = !todo.complete;
            })
    };
    return actionHandle[action.type] ? actionHandle[action.type](state, action.payload) : state;
};

const todos = (state = INITIAL_STATE, action) => {
    const actionHandle = {
        [FETCH_TODOS_START]: (state, payload) => {
            return {
                ...state,
                isFetching: true
            };
        },
        [FETCH_TODOS_SUCCESS]: (state, payload) => {
            return {
                ...state,
                isFetching: false,
                data: payload.data
            };
        },
        [FETCH_TODOS_FAILURE]: (state, payload) => {
            return {
                ...state,
                isFetching: false,
                errText: payload.errMsg
            };
        }
    };
    return actionHandle[action.type]
        ? actionHandle[action.type](state, action.payload)
        : { ...state, data: todosData(state.data, action) };
};

export default todos;
