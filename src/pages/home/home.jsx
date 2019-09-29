import React, { Component } from 'react';
import { connect } from 'react-redux';

import './home.less';

class Home extends Component {
  render() {
    return (
      <div className="home">
        欢迎使用后台管理系统，{this.props.user.username}
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  null
)(Home);
