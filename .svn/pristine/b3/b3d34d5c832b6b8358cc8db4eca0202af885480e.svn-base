import { combineReducers } from 'redux';
import chatReducer from './chatReducer';

import { actionsTypes } from '../actions/actionsTypes';
import agentReducer from './agentReducer';
import entitiesReducer from './entitiesReducer';
import monitorReducer from './monitorReducer';

const appReducer = combineReducers({
  auth: agentReducer
});

const rootReducer = (state, action) => {
  if (action.type === actionsTypes.authLogout) {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer;
