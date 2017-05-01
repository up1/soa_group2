import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from '../UpperHeaderSection';
import Footer from '../FooterSection';
import '../css/cart.css';
import CartItem from './CartItem';

class Cart extends React.Component {

  constructor(props) {
    super(props);
    this.getTotalPrice = this
      .getTotalPrice
      .bind(this);
    this.state = {
      total: this.getTotalPrice(),
    };
    this.setCartTotalPrice = this
      .setCartTotalPrice
      .bind(this);
    this.checkOut = this
      .checkOut
      .bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const cartItems = Object.keys(nextProps.cart);
    let total = 0;
    for (let i = 0; i < cartItems.length; i += 1) {
      total += nextProps.cart[cartItems[i]].amount * nextProps.cart[cartItems[i]].price;
    }
    this.setState({ total });
  }

  getTotalPrice() {
    const cartItems = Object.keys(this.props.cart);
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      total += this.props.cart[cartItems[i]].amount * this.props.cart[cartItems[i]].price;
    }
    return total;
  }

  setCartTotalPrice() {
    this.setState({
      total: this.getTotalPrice(),
    });
  }

  checkOut() {
    if (this.props.user) {
      this
        .props
        .history
        .push('/chooseaddress');
    } else {
      this
        .props
        .history
        .push('/submit');
    }
  }

  render() {
    const cartItems = Object
      .keys(this.props.cart)
      .map(itemId => (<CartItem
        key={itemId}
        index={itemId}
        item={this.props.cart[itemId]}
        setCartTotalPrice={this.setCartTotalPrice}
        cartId={this.props.cartId}
        user={this.props.user}
        removeFromCart={this.props.removeFromCart}  
      />));
    return (
      <div className="my-cart">
        <Navbar user={this.props.user} userLogout={this.props.userLogout}  />
        <div className="container" id="cart-container">
          <div className="row">
            <div className="col-sm-12 col-md-10 col-md-offset-1">
              <h1>
                ตระกร้าสินค้า
              </h1>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Total</th>
                    <th  />
                  </tr>
                </thead>
                <tbody>
                  {cartItems}
                  <tr>
                    <td  />
                    <td  />
                    <td  />
                    <td>
                      <h3>Total</h3>
                    </td>
                    <td className="text-right">
                      <h3>
                        <strong>{this.state.total}</strong>
                      </h3>
                    </td>
                  </tr>
                  <tr>
                    <td  />
                    <td  />
                    <td  />
                    <td>
                      <button type="button" className="btn btn-default">
                        <span className="glyphicon glyphicon-shopping-cart"  />
                        Continue Shopping
                      </button>
                    </td>
                    <td>

                      <button type="button" className="btn btn-success" onClick={this.checkOut}>
                        Checkout
                        <span className="glyphicon glyphicon-play"  />
                      </button>

                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer  />
      </div>
    );
  }
}

Cart.propType = {
  user: PropTypes.string.isRequired,
  userLogout: PropTypes.func.isRequired,
};

export default Cart;
