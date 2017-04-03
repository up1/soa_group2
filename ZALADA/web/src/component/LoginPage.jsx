import React from 'react';  
import UpperHeaderSection from './Sale/UpperHeaderSection.jsx'
import FooterSection from './Sale/FooterSection.jsx'
import './css/loginPage.css'
import logo from './img/logoZALADA.png'
import axios from 'axios'

class LoginPage extends React.Component {

    constructor(){
        super()
        this.state = {
            username : "",
            password : ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event){
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    handleSubmit(){
        const data = {
            username : this.state.username,
            password : this.state.password
        }
        axios.get(`http://localhost:9004/member/signin?username=${this.state.username}&password=${this.state.password}`)
        .then(
            (response) => {
                this.props.updateUser(this.state.username)
                this.context.router.history.push('/')
            }
        )
        .catch(
            (error) => {
                console.log(error)
            }
        )
    }

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
                            <input type="text" name="username" placeholder="Username" className="form-control username" onChange={this.handleChange} />
                            <input type="password" name="password" placeholder="Password" className="form-control password" onChange={this.handleChange}/>
                            <button type="button" className="btn btn-default btn-block btn-custom" id="btn-ok" onClick={this.handleSubmit}>เข้าสู่ระบบ</button>
                        </div>
                    </div>
                </div>
                <FooterSection/>
            </div>
        )
    }
}

LoginPage.contextTypes = {
  router: React.PropTypes.object
}

export default LoginPage;