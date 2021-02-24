import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../redux/todo/actions';
import { setText } from '../redux/text/actions';

function AddTodo() {
    let input;
    const { text } = useSelector(
        ({ text }) => ({
            text: text
        }),
        shallowEqual
    );
    const dispatch = useDispatch();
    return (
        <div>
            <input
                type="text"
                value={text}
                onChange={(e) => {
                    dispatch(setText(e.target.value));
                }}
                ref={(node) => (input = node)}
            />
            <button
                onClick={(e) => {
                    if (!input.value.trim()) {
                        return;
                    }
                    dispatch(addTodo(input.value));
                    input.value = '';
                }}
            >
                add
            </button>
        </div>
    );
}

export default AddTodo;
