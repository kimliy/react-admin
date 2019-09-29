import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import logo from './images/logo.svg';
import './login.less';
import { login } from '../../store/actionCreators';

class Login extends Component {
  render() {
    const { user } = this.props
    if (user && user._id) {
      return <Redirect to="/" />
    }
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>React学习项目：后台管理系统</h1>
        </header>
        <section className="login-content">
          {/* 登录错误 会有msg存入redux 显示出来 */}
          <div className={user.msg ? 'error-msg show' : 'error-msg'}>
            {user.msg}
          </div>
          <h2>用户登录</h2>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: '请输入用户名!' },
                  { min: 4, message: '用户名至少4位' },
                  { max: 12, message: '用户名最多12位' },
                  { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' }
                ]
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  { validator: this.validatePwd }
                ],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Log in
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
  validatePwd = (rule, value, callback) => {
    const pwdLen = value && value.length
    const pwdReg = /^[a-zA-Z0-9_]+$/
    if (!value) {
      callback('请输入密码！')
    } else if (pwdLen < 4) {
      callback('密码必须大于4位')
    } else if (pwdLen > 12) {
      callback('密码必须小于 12 位')
    } else if (!pwdReg.test(value)) {
      callback('密码必须是英文、 数组或下划线组成')
    } else {
      callback()
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { username, password } = values;
        this.props.login(username, password);
      } else {
        message.error('校验失败');
      }
    });
  }
}

const WrappedLogin = Form.create({ name: 'horizontal_login' })(Login);

const mapState = (state) => {
  return {
    user: state.user
  }
}
const mapDispatch = (dispatch) => {
  return {
    login(username, password) {
      dispatch(login(username, password))
    }
  }
}

export default connect(mapState, mapDispatch)(WrappedLogin);