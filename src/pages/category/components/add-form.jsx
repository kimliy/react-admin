import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Input } from 'antd';

const { Option } = Select;

class AddForm extends Component {
  static propTypes = {
    parentId: PropTypes.string.isRequired,
    categorys: PropTypes.array.isRequired,
    setForm: PropTypes.func.isRequired
  }
  componentWillMount() {
    // 调用父组件传来的方法 把this.props.form里面一系列的方法赋值给父组件
    this.props.setForm(this.props.form);
  }
  render() {
    const { parentId, categorys } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="add-form">
        <Form.Item label="所属分类">
          {getFieldDecorator('parentId', {
            initialValue: parentId,
            rules: [{ required: true }],
          })(
            <Select>
              <Option value='0' key='0'>一级分类</Option>
              {categorys.map(item => (
                <Option key={item._id} value={item._id}>{item.name}</Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="分类名称">
          {getFieldDecorator('categoryName', {
            initialValue: '',
            rules: [{ required: true, message: '必须输入分类名称！' }],
          })(
           <Input placeholder="请输入分类名称" />
          )}
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create({ name: 'add-form' })(AddForm);