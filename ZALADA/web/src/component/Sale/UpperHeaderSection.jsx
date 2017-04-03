const React = require('react');
import { Link } from 'react-router-dom';
import SearchForm from './SearchForm.jsx';
import './css/UpperHeader.css';

class UpperHeaderSection extends React.Component {

  render() {
    const text = "Cart("+5+")";
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
            <Link to="/" className="navbar-brand">ZALADA</Link>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

            <SearchForm />

            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/cart">
                  <img src="http://www.pngall.com/wp-content/uploads/2016/04/Cart-Free-Download-PNG.png" alt="" className="cart-icon image-responsive"
                    width="22px" height="22px" data-tip={text} />
                </Link>
              </li>
              <li><Link to="/signup">มี account แล้วหรือยัง?</Link></li>
              <li><Link to="/login">เข้าสู่ระบบ</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default UpperHeaderSection;