import {
  SET_USER,
  SHOW_ERR_MSG
} from './actionTypes.js'
import { reqLogin } from '../api/index'
import storageUtils from '../utils/storageUtils'

const setUser = (user) => ({
  type: SET_USER,
  user
})

const showErrorMsg = (msg) => ({
  type: SHOW_ERR_MSG,
  msg
})

// 登录
export const login = (username, password) => {
  return async dispatch => {
    const res = await reqLogin(username, password)
    if (res.status === 0) {
      const user = res.data;
      storageUtils.saveUser(user);
      dispatch(setUser(user));
    } else {
      const msg = res.msg;
      dispatch(showErrorMsg(msg))
    }
  }
}