import { combineReducers } from 'redux';
import {
  SET_USER,
  SHOW_ERR_MSG
} from './actionTypes';
import storageUtils from '../utils/storageUtils';

const defaultUser = storageUtils.getUser()

const user = (state = defaultUser, action) => {
  switch (action.type) {
    case SET_USER: 
      return action.user
    case SHOW_ERR_MSG:
      const msg = action.msg
      return {...state, msg}
    default: 
      return state
  }
}

export default combineReducers({
  user
})