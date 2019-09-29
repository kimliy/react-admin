import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './index.less';
import menuList from '../../config/menuConfig';
import logo from '../../pages/login/images/logo.svg';
import { setTitle } from '../../store/actionCreators'

const { SubMenu } = Menu;

class LeftNav extends Component {
  constructor(props) {
    super(props);
  }
  /*
    得到当前用户需要显示的所有menu元素的列表
    使用递归调用
 */
  getNodes = (list) => {
    return list.map(item => {
      if (!item.children) {
        return (
          // 子菜单
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        return (
          // 母菜单
          <SubMenu
            key={item.key}
            title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
            {this.getNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }
  /*
  *   判断当前登陆用户对item是否有权限
  * */
  hasAuth = (item) => {
    const { isPublic, key } = item;
    const { username } = this.props.user;
    const { menus } = this.props.user.role;

    if (username === 'admin' || isPublic || menus.indexOf(key) !== -1) {
      // 先看是否为管理员 然后看是不是公开的 最后看权限菜单有没有包含
      return true;
    } else if (item.children) {
      // 当前用户有该母菜单的某个子菜单权限时 find找的是某个值 !!转为boolean
      return !!item.children.find(child => menus.indexOf(child.key) !== -1);
    }
    return false;
  }
  getNodes_reduce = (list) =>{
    const path = this.props.location.pathname; //当前请求路由路径
    return list.reduce((pre, item) => {
      if (this.hasAuth(item)) {
        if (item.key === path || path.indexOf(item.key) === 0) {
          this.props.setTitle(item.title)
        }
        if (!item.children) {
          pre.push((
            <Menu.Item key={item.key} onClick={() => this.props.setTitle(item.title)}>
              <Link to={item.key}>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          ))
        } else {
          const cItem = item.children.find(child => path.indexOf(child.key) === 0);
          if (cItem) {
            this.openKey = item.key; // 当前打开的菜单
          }
          pre.push((
            <SubMenu
              key={item.key}
              title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
              {this.getNodes_reduce(item.children)}
            </SubMenu>
          ))
        }
      }
      return pre;
    }, [])
  }
  componentWillMount() {
    this.menuNodes = this.getNodes_reduce(menuList);
  }
  render() {
    const path = this.props.location.pathname; // 当前打开路径 也就是要选中的那一栏
    const openKey = this.openKey; // 要打开的那一栏
    return (
      <div className="left-nav">
        <Link to="/home" className="logo">
          <img src={logo} alt="logo" />
          <h1>React后台</h1>
        </Link>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark">
          {this.menuNodes}
        </Menu>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {setTitle}
)(withRouter(LeftNav));
