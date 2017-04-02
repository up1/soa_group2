const React = require('react');
import LoginForm from './LoginForm.jsx';
import SearchForm from './SearchForm.jsx';
import './css/UpperHeader.css';

class UpperHeaderSection extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
        <div className="container-fluid">

          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">ZALADA</a>
          </div>


          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

            <SearchForm />

            <ul className="nav navbar-nav navbar-right">
              <li><a href="#">Already have an account?</a></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown"><b>Login</b> <span className="caret"></span></a>
                <ul id="login-dp" className="dropdown-menu">
                  <li>
                    <div className="row">
                      <div className="col-md-12">
                        Login via
								        <div className="social-buttons">
                          <a href="#" className="btn btn-fb"><i className="fa fa-facebook"></i> Facebook</a>
                          <a href="#" className="btn btn-tw"><i className="fa fa-twitter"></i> Twitter</a>
                        </div>
                        or
                        <LoginForm />
                      </div>
                      <div className="bottom text-center">
                        New here ? <a href="#"><b>Join Us</b></a>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default UpperHeaderSection;