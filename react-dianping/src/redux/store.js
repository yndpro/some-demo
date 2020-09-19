import { createStore , applyMiddleware , compose } from 'redux';
import thunks from 'redux-thunk';
//import thunks from './middleware/thunks';
import callApi from './middleware/callApi';
import rootReducer from './modules/index';

let store;

if(process.env.NODE_ENV !== "production"){
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = createStore(rootReducer,composeEnhancers(applyMiddleware(
    thunks,
    callApi
  )));
}else{
  store = createStore(rootReducer,applyMiddleware(
    thunks,
    callApi
  ));
}

export default store;