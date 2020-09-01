import React from 'react';

const Todos = ({todos,setFilter,onClick:onTodoClick}) => (
    <div>
        <ul>
        {todos.map((todo,index) => {
            return <li key={index} onClick={onClick} className={todo.complete ? "completed" : ""}>{todo.text}</li>
        })}
        </ul>
        <button onClick={() => setFilter("all")}>all</button>
        <button onClick={() => setFilter("completed")}>completed</button>
        <button onClick={() => setFilter("uncompleted")}>uncompleted</button>
    </div>
)

export default Todos;