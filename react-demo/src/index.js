import React from 'react';
import thunkMiddleware from 'redux-thunk';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware ,compose} from 'redux';
import rootReducer from './reducer/index';
import App from'./app';

/**开发环境，开启redux-devtools */
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(rootReducer,applyMiddleware(
    thunkMiddleware
));

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)