import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/filter/actions';

function Filters() {
    const { filter } = useSelector(
        ({ filter }) => ({
            filter: filter
        }),
        shallowEqual
    );
    const dispatch = useDispatch();
    return (
        <div>
            {filter === 'ALL' ? <span>ALL</span> : <button onClick={() => dispatch(setFilter('ALL'))}>ALL</button>}
            {filter === 'COMLETED' ? (
                <span>COMLETED</span>
            ) : (
                <button onClick={() => dispatch(setFilter('COMLETED'))}>COMLETED</button>
            )}
            {filter === 'UNCOMLETED' ? (
                <span>UNCOMLETED</span>
            ) : (
                <button onClick={() => dispatch(setFilter('UNCOMLETED'))}>UNCOMLETED</button>
            )}
        </div>
    );
}

export default Filters;
