import { combineReducers } from 'redux';
import app from './app';
import home from './home';
import entities from './entities';

export default combineReducers({
  app,
  home,
  entities
})

