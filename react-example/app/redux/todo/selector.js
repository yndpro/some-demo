export const selectVisibleTodos = ({ filter, todos }) => {
    console.log('getVisibleTodos selector');
    switch (filter) {
        case 'COMLETED':
            return todos.data.filter((todo) => todo.complete === true);
        case 'UNCOMLETED':
            return todos.data.filter((todo) => todo.complete !== true);
        default:
            return todos.data;
    }
};
