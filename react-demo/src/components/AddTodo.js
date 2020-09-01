import React from 'react';

const AddTodo = ({onAdd:onAddTodo}) => {
    let input;
    return (
        <div>
            <input type="text" ref={node => input = node}/>
            <button onClick={e => {
                
            }}>add</button>
        </div>
    )
}

    
export default AddTodo;