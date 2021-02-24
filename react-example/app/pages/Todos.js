import React, { useEffect, useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { toggleTodo, fetchTodos } from '../redux/todo/actions';
import { selectVisibleTodos } from '../redux/todo/selector';
import './style.scss';

const array = ['jack', 'tom', 'lucy', 'kate']; //因为loadash都是数组的方法，所以我们定义一个数组

function Todos() {
    const { todos } = useSelector(
        (state) => ({
            todos: selectVisibleTodos(state)
        }),
        shallowEqual
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodos());
    }, []);

    return (
        <ul>
            {todos.map((todo, index) => {
                return (
                    <li
                        key={index}
                        onClick={(e) => dispatch(toggleTodo(todo.id))}
                        className={todo.complete ? 'completed' : ''}
                    >
                        {todo.text}
                        {_.first(array)}
                    </li>
                );
            })}
        </ul>
    );
}

export default Todos;
