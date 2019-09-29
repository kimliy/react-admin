import { combineReducers } from 'redux';
import {
  SET_USER,
  SHOW_ERR_MSG,
  SET_TITLE,
  RESET_USER
} from './actionTypes';
import storageUtils from '../utils/storageUtils';

const defaultUser = storageUtils.getUser();
const defaultTitle = '首页';

const user = (state = defaultUser, action) => {
  switch (action.type) {
    case SET_USER: 
      return action.user
    case SHOW_ERR_MSG:
      const msg = action.msg
      return {...state, msg}
    case RESET_USER:
      return {}
    default: 
      return state
  }
}

const title = (state = defaultTitle, action) => {
  switch (action.type) {
    case SET_TITLE: 
      return action.title
    default:
      return state
  }
}

export default combineReducers({
  user,
  title
})