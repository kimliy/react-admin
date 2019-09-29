import React, { Component, Fragment } from 'react';
import { Layout } from 'antd';
import { Redirect, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import LeftNav from '../../components/leftNav';
import Header from '../../components/header';
import Category from '../category/category';
import Home from '../home/home';
import Product from '../product/product';
import Role from '../role/role';
import User from '../user/user';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';
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
              <Switch>
                {/* <Redirect exact from="/" to="/home" /> */}
                <Route path="/home" component={Home} />
                <Route path="/category" component={Category} />
                <Route path="/product" component={Product} />
                <Route path="/user" component={User} />
                <Route path="/role" component={Role} />
                <Route path="/charts/bar" component={Bar} />
                <Route path="/charts/line" component={Line} />
                <Route path="/charts/pie" component={Pie} />
                <Redirect to="/home" />
              </Switch>
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