import {createSelector} from 'reselect'

export const getFilter = (state) => state.get("filter");

export const getText = (state) => state.get("test");

export const getTodos = (state) => state.getIn(['todos','data']);

export const getVisibleTodos = (state) => {
    console.log("getVisibleTodos selector");
    let $$filter = state.get("filter");
    let $$todos = state.getIn(['todos','data']);
    switch ($$filter) {
        case 'COMLETED': 
            return $$todos.filter($$todo => $$todo.get('complete') === true)
        case 'UNCOMLETED': 
            return $$todos.filter($$todo => $$todo.get('complete') !== true)
        default:
            return $$todos;
    }
}

// export const getVisibleTodos = createSelector(
//     [getTodos,getFilter],
//     ($$todos,filter) => {
//         console.log("getVisibleTodos selector");
//         switch (filter) {
//             case 'COMLETED': 
//                 return $$todos.filter($$todo => $$todo.get('complete') === true)
//             case 'UNCOMLETED': 
//                 return $$todos.filter($$todo => $$todo.get('complete') !== true)
//             default:
//                 return $$todos;
//         }
//     }
// )
