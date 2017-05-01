import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import SearchForm from './SearchForm';
import './css/UpperHeader.css';

class UpperHeaderSection extends React.Component {

  render() {
    const text = `Cart(${  0  })`;

    const rightNavUser = this.props.user
      ? (<li className="dropdown">
        <a className="dropdown-toggle" data-toggle="dropdown" href="#">บัญชีผู้ใช้คุณ {this.props.user}
            <span className="caret" />
          </a>
        <ul className="dropdown-menu">
            <li>
              <a href="#">แก้ไขข้อมูล</a>
            </li>
            <li>
              <Link to="/cart" >ตะกร้าสินค้า</Link>
            </li>
            <li>
              <Link to="/stock">คลังสินค้า</Link>
            </li>
            <li>
              <a onClick={this.props.userLogout}>ออกจากระบบ</a>
            </li>
          </ul>
      </li>)
      : (<li>
        <Link to="/signup">มี account แล้วหรือยัง?</Link>
      </li>);

    const rightNavOptional = this.props.user
      ? ''
      : (<li>
        <Link to="/login">เข้าสู่ระบบ</Link>
      </li>);
    return (
      <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />

            </button>
            <Link to="/" className="navbar-brand" id="brand-image-link"><img
              alt="Brand"
              id="brand-image"
              src="https://raw.githubusercontent.com/up1/soa_group2/master/Image/logoZALADA.png"
            /></Link>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <SearchForm />
            <Link to="/category">
              <span className="navbar-brand">
                ประเภทสินค้า
              </span>
            </Link>

            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/cart">
                  <img
                    src="http://www.pngall.com/wp-content/uploads/2016/04/Cart-Free-Download-PNG.png"
                    alt=""
                    className="cart-icon image-responsive"
                    width="22px"
                    height="22px"
                    data-tip={text}
                  />
                </Link>
              </li>
              {rightNavUser}
              {rightNavOptional}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

UpperHeaderSection.defaultProps = {
  user: null,
};

UpperHeaderSection.propTypes = {
  user: PropTypes.string,
  userLogout: PropTypes.func.isRequired,
};

export default UpperHeaderSection;
