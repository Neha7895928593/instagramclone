// index.js

import { combineReducers } from 'redux';
import userReducer from './User_reducers.js';

// Combine Reducers
const rootReducer = combineReducers({
  userReducer: userReducer,
});

export default rootReducer;
