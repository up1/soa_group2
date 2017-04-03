import React from 'react';  
import UpperHeaderSection from './Sale/UpperHeaderSection.jsx'
import FooterSection from './Sale/FooterSection.jsx';
import './css/loginPage.css'
import logo from './img/logoZALADA.png'

class LoginPage extends React.Component {
    render() {
        return (
            <div className="login-page">
                <UpperHeaderSection />
                <div className="container-login">
                    <div id="login-box">
                        <div className="logo">
                            <img src={logo} className="img img-responsive center-block" />
                            <h1 className="logo-caption">เข้าสู่ระบบ</h1>
                        </div>
                        <div className="controls">
                            <input type="text" name="username" placeholder="Username" className="form-control" />
                            <input type="password" name="username" placeholder="Password" className="form-control" />
                            <button type="button" className="btn btn-default btn-block btn-custom" id="btn-ok">เข้าสู่ระบบ</button>
                        </div>
                    </div>
                </div>
                <FooterSection/>
            </div>
        )
    }
}

export default LoginPage;