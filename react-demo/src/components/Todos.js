import React, { Component } from 'react';
import './style.scss';

class Todos extends Component {
    componentDidMount(){
        this.props.fetchTodos();
    }
    render() {
        console.log("render");
        let {todos,onTodoClick:onClick} = this.props;
        return (
            <ul>
            {todos.map((todo,index) => {
                return <li 
                    key={index} 
                    onClick={e=>onClick(todo.id)} 
                    className={todo.complete ? "completed" : ""}
                >{todo.text}</li>
            })}
            </ul>
        );
    }
}

export default Todos;