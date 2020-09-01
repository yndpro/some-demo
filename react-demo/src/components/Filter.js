import React from 'react';

const Filter = ({setFilter}) => (
    <div>
        <button onClick={() => setFilter("all")}>all</button>
        <button onClick={() => setFilter("completed")}>completed</button>
        <button onClick={() => setFilter("uncompleted")}>uncompleted</button>
    </div>
)

export default Filter;