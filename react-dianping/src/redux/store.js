import { createStore , applyMiddleware , compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './modules/index';

let store;

if(process.env.NODE_ENV !== "production"){
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = createStore(rootReducer,composeEnhancers(applyMiddleware(
    thunk
  )));
}else{
  store = createStore(rootReducer,applyMiddleware(
    thunk
  ));
}

export default store;