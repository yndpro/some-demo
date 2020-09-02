import React from 'react';

const Todos = ({todos,onTodoClick:onClick}) => (
    <ul>
    {todos.map((todo,index) => {
        return <li 
            key={index} 
            onClick={e=>onClick(todo.id)} 
            className={todo.complete ? "completed" : ""}
        >{todo.text}</li>
    })}
    </ul>
)

export default Todos;