import React, { Component } from 'react';
import { Card, Table, Button, Icon, message, Modal} from 'antd';

import LinkButton from '../../components/linkButton';
import { reqCategorys } from '../../api';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parentId: '0',
      loading: false,
      categorys: [], // 一级分类
      subCategorys: [], // 二级分类
    };
  }
  render() {
    return (
      <div>
        Category
      </div>
    )
  }
  getCategorys = async(parentId) => {
    this.setState({
      loading: true
    });
    parentId = parentId || this.state.parentId;
    const res = await reqCategorys(parentId);
    this.setState({
      loading: false
    });
    if (res.status === 0) {
      if (parentId === '0') {
        this.setState({
          categorys: res.data
        })
      } else {
        this.setState({
          subCategorys: res.data
        })
      }
    } else {
      message.error('获取分类数据失败');
    }
  }
  componentDidMount() {
    this.getCategorys();
  }
}

export default Category;
