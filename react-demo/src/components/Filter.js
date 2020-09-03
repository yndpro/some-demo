import React from 'react';

const Filters = ({setFilter,filter}) => (
    <div>
        {filter === "ALL" ? <span>ALL</span> : <button onClick={() => setFilter("ALL")}>ALL</button>}
        {filter === "COMLETED" ? <span>COMLETED</span> : <button onClick={() => setFilter("COMLETED")}>COMLETED</button>}
        {filter === "UNCOMLETED" ? <span>UNCOMLETED</span> : <button onClick={() => setFilter("UNCOMLETED")}>UNCOMLETED</button>}
    </div>
)

export default Filters;