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
    const { parentId, loading, categorys, subCategorys } = this.state;
    const extra = (
      <Button type="primary">
        <Icon type="plus" />
        添加
      </Button>
    )
    return (
      <Card title="我是标题" extra={extra}>
        <Table
          bordered
          rowKey="_id"
          columns={this.columns}
          loading={loading}
          dataSource={parentId==='0' ? categorys : subCategorys}
          pagination={{defaultPageSize: 5, showQuickJumper: true}}
        />
      </Card>
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
  initColumns = () => {
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name'
      },
      {
        title: '操作',
        width: 300,
        align: 'center',
        render: (text, record, index) => (
          <span>
            <LinkButton name="修改分类"></LinkButton>
            {this.state.parentId === '0' ? <LinkButton name="查看子分类" /> : null}
          </span>
        )
      }
    ]
  }
  componentWillMount() {
    this.initColumns();
  }
  componentDidMount() {
    this.getCategorys();
  }
}

export default Category;
