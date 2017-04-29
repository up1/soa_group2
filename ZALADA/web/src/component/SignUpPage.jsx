import React from 'react';
import UpperHeaderSection from './Sale/UpperHeaderSection';
import FooterSection from './Sale/FooterSection';
import './css/signupPage.css';
import { UserService } from '../util/AxiosWrapper';

class SignUpPage extends React.Component {

  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      password_re: '',
      email: '',
      email_re: '',
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
      signIn: {
        username: this.state.username,
        password: this.state.password,
      },
      member: {
        email: this.state.email,
      },
    };

    UserService
      .post('/member/signup', data)
      .then((response) => {
        this
          .props
          .updateUser(this.state.username);
        this
          .context
          .router
          .history
          .push('/');
      } )
      .catch((error) => {
        console.log(error);
      } );

    console.log(data);
  }

  render() {
    return (
      <div className="signup_page">
        <UpperHeaderSection />
        <div className="container-fluid" id="container-Sign">
          <section className="container-signup">
            <div className="container-page" id="form-signup">
              <div className="col-md-6">
                <h3 className="dark-grey">สร้างบัญชีลูกค้าใหม่</h3>

                <div className="form-group col-lg-12">
                  <label>ชื่อผู้ใช้</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    onChange={this.handleChange}
                  />
                </div>

                <div className="form-group col-lg-6">
                  <label>รหัสผ่าน</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    onChange={this.handleChange}
                  />
                </div>

                <div className="form-group col-lg-6">
                  <label>ยืนยันรหัสผ่าน</label>
                  <input
                    type="password"
                    name="password_re"
                    className="form-control"
                    onChange={this.handleChange}
                  />
                </div>

                <div className="form-group col-lg-6">
                  <label>Email Address</label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    onChange={this.handleChange}
                  />
                </div>

                <div className="form-group col-lg-6">
                  <label>ยืนยัน Email Address</label>
                  <input
                    type="text"
                    name="email_re"
                    className="form-control"
                    onChange={this.handleChange}
                  />
                </div>

              </div>

              <div className="col-md-6">
                <h3 className="dark-grey">Terms and Conditions</h3>
                <p>
                  By clicking on "Register" you agree to The Company's' Terms and Conditions</p>
                <p>
                  While rare, prices are subject to change based on exchange rate fluctuations -
                  should such a fluctuation happen, we may request an additional payment. You have
                  the option to request a full refund or to pay the new price. (Paragraph 13.5.8)
                </p>
                <p>
                  Should there be an error in the description or pricing of a product, we will
                  provide you with a full refund (Paragraph 13.5.6)</p>
                <p>
                  Acceptance of an order by us is dependent on our suppliers ability to provide
                  the product. (Paragraph 13.5.6)</p>

                <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>สมัครสมาชิก</button>
              </div>
            </div>
          </section>
        </div>
        <FooterSection />
      </div>
    );
  }
}

SignUpPage.contextTypes = {
  router: React.PropTypes.object,
};

export default SignUpPage;
