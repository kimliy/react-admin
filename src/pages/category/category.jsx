import React, { Component } from 'react';
import { Card, Table, Button, Icon, message, Modal } from 'antd';

import LinkButton from '../../components/linkButton';
import { reqCategorys, reqAddCategory, reqUpdateCategory } from '../../api';
import AddForm from './components/add-form';
import UpdateForm from './components/update-form';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parentId: '0',
      loading: false,
      categorys: [], // 一级分类
      subCategorys: [], // 二级分类
      showStatus: 0, // 添加或更新弹窗显示隐藏
      parentName: ''
    };
  }
  render() {
    const { parentId, loading, categorys, subCategorys, showStatus, parentName } = this.state;
    const category = this.category || {};
    const title = parentId === '0' ? '一级分类标题' :
      <span>
        <LinkButton onClick={this.showCategorys} name="一级分类列表"></LinkButton>
        <Icon type='arrow-right' style={{ marginRight: 5 }} />
        <span>{parentName}</span>
      </span>
    const extra = (
      <Button type="primary" onClick={this.addItem}>
        <Icon type="plus" />
        添加
      </Button>
    )
    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey="_id"
          columns={this.columns}
          loading={loading}
          dataSource={parentId === '0' ? categorys : subCategorys}
          pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        />
        <Modal
          title="添加分类"
          visible={showStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <AddForm
            parentId={parentId}
            categorys={categorys}
            setForm={(form) => this.form = form}
          />
        </Modal>
        <Modal
          title="更新分类"
          visible={showStatus === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <UpdateForm
            categoryName={category.name}
            setForm={(form) => this.form = form}
          />
        </Modal>
      </Card>
    )
  }
  getCategorys = async (parentId) => {
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
            <LinkButton name="更新分类" onClick={() => this.updateItem(text)}></LinkButton>
            {this.state.parentId === '0' ? <LinkButton onClick={() => this.showSubCategorys(text)} name="查看子分类" /> : null}
          </span>
        )
      }
    ]
  }
  addItem = () => {
    this.setState({
      showStatus: 1
    })
  }
  handleCancel = () => {
    // 取消前先清空表单 直接子组件调用setForm方法...
    this.form.resetFields();
    this.setState({
      showStatus: 0
    })
  }
  updateItem = (item) => {
    // 弹出窗时保留值 更新时要用其参数
    this.category = item;
    this.setState({
      showStatus: 2
    })
  }
  addCategory = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({
          showStatus: 0
        })
        const { parentId, categoryName } = values;
        const res = await reqAddCategory(parentId, categoryName);
        if (res.status === 0) {
          if (parentId === this.state.parentId) {
            this.getCategorys()
          } else if (parentId === '0') {
            this.getCategorys('0')
          }
        } else {
          message.error(res.msg);
        }
      }
    })
  }
  updateCategory = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({
          showStatus: 0
        })
        const categoryId = this.category._id;
        const { categoryName } = values;
        this.form.resetFields();
        const result = await reqUpdateCategory({ categoryId, categoryName });
        if (result.status === 0) {
          this.getCategorys();
        } else {
          message.error(result.msg);
        }
      }
    });
  }
  // 显示子分类
  showSubCategorys = (item) => {
    // 查看子分类
    console.log(item);
    this.setState({
      parentId: item._id, // 该子分类的parentId为当前母分类的_id
      parentName: item.name
    }, () => {
      // state数据更新完后执行
      this.getCategorys();
    })
  }
  // 显示母分类
  showCategorys = () => {
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: []
    })
  }
  componentWillMount() {
    this.initColumns();
  }
  componentDidMount() {
    this.getCategorys();
  }
}

export default Category;
