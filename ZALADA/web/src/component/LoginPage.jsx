import React from 'react';
import PropTypes from 'prop-types';
import UpperHeaderSection from './Sale/UpperHeaderSection';
import FooterSection from './Sale/FooterSection';
import './css/loginPage.css';
import logo from './img/logoZALADA.png';
import { MemberService } from '../util/AxiosWrapper';

class LoginPage extends React.Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
    this.handleChange = this
      .handleChange
      .bind(this);
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
  }

  handleChange(event) {
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  handleSubmit() {
    const data = {
      ...this.state,
    };
    console.log(data);
    MemberService
      .post('/member/signin', data)
      .then((response) => {
        console.log(response.data);
        this
          .props
          .userLogin(this.state.username, response.data.access_token, response.data.cartId);
        this
          .props
          .history
          .push('/');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="login-page">
        <UpperHeaderSection user={this.props.user} userLogout={this.props.userLogout} />
        <div className="container-login">
          <div id="login-box">
            <div className="logo">
              <img src={logo} className="img img-responsive center-block" alt="logo" />
              <h1 className="logo-caption">เข้าสู่ระบบ</h1>
            </div>
            <div className="controls">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="form-control username"
                onChange={this.handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control password"
                onChange={this.handleChange}
              />
              <button
                type="button"
                className="btn btn-default btn-block btn-custom"
                id="btn-ok"
                onClick={this.handleSubmit}
              >เข้าสู่ระบบ</button>
            </div>
          </div>
        </div>
        <FooterSection />
      </div>
    );
  }
}

LoginPage.propTypes = {
  userLogin: PropTypes.func.isRequired,
  user: PropTypes.string,
};

LoginPage.contextTypes = {
  router: React.PropTypes.object,
};


export default LoginPage;
