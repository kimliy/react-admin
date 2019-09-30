import ajax from './ajax';
import { message } from 'antd';
import jsonp from 'jsonp';

const baseUrl = '/api';

const reqLogin = (username, password) => ajax(baseUrl + '/login', {username, password}, 'POST');

//百度天气
const reqWeather = (city) => {
  const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
  return new Promise((resolve, reject) => {
    jsonp(url, {
      params: 'callback'
    }, (error, data) => {
      if (!error && data.status === 'success') {
        const {dayPictureUrl, weather} = data.results[0].weather_data[0];
        resolve({dayPictureUrl, weather});
      } else {
        message.error('获取天气失败');
      }
    })
  })
}

// 获取分类列表
const reqCategorys = (parentId = '0') => ajax(baseUrl + '/manage/category/list', {parentId});

// 添加分类
const reqAddCategory = (categoryName, parentId) => ajax(baseUrl + '/manage/category/add', {categoryName, parentId}, 'POST');

// 更新分类
const reqUpdateCategory = ({categoryId, categoryName}) => ajax(baseUrl + '/manage/category/update', {categoryId, categoryName}, 'POST');

export {
  reqLogin,
  reqWeather,
  reqCategorys,
  reqAddCategory,
  reqUpdateCategory
}