import React, { Component } from 'react';
import './index.less';
import { connect } from 'react-redux';
import { formateDate } from '../../utils/dateUtils.js';
import { reqWeather } from '../../api/index';
import LinkButton from '../../components/linkButton';
import { Modal } from 'antd';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: formateDate(Date.now()),
      dayPictureUrl: '',
      weather: ''
    }
  }
  render() {
    const { user } = this.props;
    const { time, dayPictureUrl, weather } = this.state;
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，{user.username}</span>
          <LinkButton name="退出登录" onClick={this.logout}></LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">啦啦啦</div>
          <div className="header-bottom-right">
            <span>{time}</span>
            <img src={dayPictureUrl} alt="weather"  />
            <span>{weather || '暂无'}</span>
          </div>
        </div>
      </div>
    )
  }
  getTime = () => {
    this.intervalId = setInterval(() => {
      this.setState({
        time: formateDate(Date.now())
      });
    }, 1000)
  }
  getWeather = async() => {
    const { dayPictureUrl, weather } = await reqWeather('深圳');
    this.setState({
      dayPictureUrl,
      weather
    })
  }
  logout = () => {
    Modal.confirm({
      content: (
        <h3>确认退出吗?</h3>
      ),
      onOk() {
        console.log('logout')
      },
      onCancel() {
        console.log('cancel')
      }
    })
  }
  componentDidMount() {
    this.getTime();
    this.getWeather();
  }
  componentWillMount() {
    clearInterval(this.intervalId);
  }
}

export default connect(
  state => ({user: state.user}),
  null
)(Header);
