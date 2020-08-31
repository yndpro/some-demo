import { createStore } from 'redux';
import rootReducer from './reducer/index';
import { 
    addTodo,
    toggleTodo,
    setFilter
} from './actions/index';

const store = createStore(rootReducer);

console.log(store.getState());

store.subscribe(() => {
    console.log(store.getState());
})

store.dispatch(addTodo("learn XXX"))
store.dispatch(toggleTodo(0))
store.dispatch(setFilter("active"))

