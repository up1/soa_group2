const React = require('react');

class LoginForm extends React.Component {

    render() {
        return (
            <form className="form" role="form" method="post" action="login"  id="login-nav">
                <div className="form-group">
                    <label className="sr-only" htmlFor="exampleInputEmail2">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail2" placeholder="Email address" />
                </div>
                <div className="form-group">
                    <label className="sr-only" htmlFor="exampleInputPassword2">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Password" />
                    <div className="help-block text-right"><a href="">ลืม password ?</a></div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">เข้าสู่ระบบ</button>
                </div>
            </form>
        )
    }
}

export default LoginForm;