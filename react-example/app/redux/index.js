import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import todos from './todo/reducer';
import filter from './filter/reducer';
import text from './text/reducer';

const rootReducer = combineReducers({
    todos,
    filter,
    text
});

/**开发环境，开启redux-devtools */
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;
