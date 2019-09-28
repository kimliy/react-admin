import ajax from './ajax';
import { message } from 'antd';

const baseUrl = '/api'

const reqLogin = (username, password) => ajax(baseUrl + '/login', {username, password}, 'POST');

export {
  reqLogin
}