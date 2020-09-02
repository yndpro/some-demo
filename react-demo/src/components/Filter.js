import React from 'react';

const Filter = ({setFilter}) => (
    <div>
        <button onClick={() => setFilter("ALL")}>all</button>
        <button onClick={() => setFilter("COMLETED")}>completed</button>
        <button onClick={() => setFilter("UNCOMLETED")}>uncompleted</button>
    </div>
)

export default Filter;