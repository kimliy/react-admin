import React, { Component, Fragment } from 'react';
import { Layout } from 'antd';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import LeftNav from '../../components/leftNav';
import Header from '../../components/header';
const { Footer, Sider, Content } = Layout;

class Admin extends Component {
  render() {
    const { user } = this.props;
    if (!user._id) {
      return <Redirect to="/login"></Redirect>
    }
    return (
      <Fragment>
        <Layout style={{minHeight: '100%'}}>
          <Sider>
            <LeftNav />
          </Sider>
          <Layout>
            <Header>
              <p>Hello, {user.username}</p>
            </Header>
            <Content>
              内容
            </Content>
            <Footer style={{textAlign: 'center', color: '#aaa', fontSize: '20px'}}>
              推荐使用谷歌浏览器，可以获得更佳页面操作体验
            </Footer>
          </Layout>
        </Layout>
      </Fragment>
    );
  }
}

export default connect(
  state => ({user: state.user}),
  null
)(Admin);