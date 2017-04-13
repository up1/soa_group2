const React = require('react');
import { Link } from 'react-router-dom';
import SearchForm from './SearchForm.jsx';
import './css/UpperHeader.css';

class UpperHeaderSection extends React.Component {

  render() {
    const text = "Cart("+0+")";

    let rightNavUser = this.props.user ? <li className="dropdown">
        <a className="dropdown-toggle" data-toggle="dropdown" href="#">บัญชีผู้ใช้คุณ {this.props.user}
        <span className="caret"></span></a>
        <ul className="dropdown-menu">
          <li><a href="#">แก้ไขข้อมูล</a></li>
          <li><a href="#">ตะกร้าสินค้า</a></li>
          <li><Link to="/stock">คลังสินค้า</Link></li>
          <li><a href="#">ออกจากระบบ</a></li>
        </ul>
      </li>: <li><Link to="/signup">มี account แล้วหรือยัง?</Link></li>

    let rightNavOptional = this.props.user ? '': <li><Link to="/login">เข้าสู่ระบบ</Link></li>
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
            <Link to="/category"><span className="navbar-brand"> ประเภทสินค้า </span></Link>

            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/cart">
                  <img src="http://www.pngall.com/wp-content/uploads/2016/04/Cart-Free-Download-PNG.png" alt="" className="cart-icon image-responsive"
                    width="22px" height="22px" data-tip={text} />
                </Link>
              </li>
              {rightNavUser}
              {rightNavOptional}
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default UpperHeaderSection;