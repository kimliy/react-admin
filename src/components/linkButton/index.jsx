// 链接按钮通用组件
import React from 'react';
import './index.less';

export default (props) => {
  return <button {...props} className="link-button">{props.name}</button>
}