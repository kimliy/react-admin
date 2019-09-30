import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

class UpdateForm extends Component {
  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired
  }
  componentWillMount() {
    this.props.setForm(this.props.form);
  }
  render() {
    const { categoryName } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="update-form">
        <Form.Item label="分类名称">
          {getFieldDecorator('categoryName', {
            initialValue: categoryName,
            rules: [{ required: true, message: '必须输入分类名称！' }],
          })(
           <Input placeholder="请输入分类名称" />
          )}
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create({ name: 'update-form' })(UpdateForm);