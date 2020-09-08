
export const getFilter = (state) => state.get("filter");

export const getText = (state) => state.get("test");

export const getVisibleTodos = (state) => {
    let $$todos = state.getIn(['todos','data']);
    switch (state.get('filter')) {
        case 'COMLETED': 
            return $$todos.filter($$todo => $$todo.get('complete') === true)
        case 'UNCOMLETED': 
            return $$todos.filter($$todo => $$todo.get('complete') !== true)
        default:
            return $$todos;
    }
}