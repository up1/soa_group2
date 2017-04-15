import React from 'react';
import Navbar from '../UpperHeaderSection.jsx'
import Footer from '../FooterSection.jsx'
import '../css/cart.css'
import CartItem from './CartItem.jsx'

class Cart extends React.Component {

    constructor(props) {
        super(props)
        this.getTotalPrice = this
            .getTotalPrice
            .bind(this)
        this.state = {
            total: this.getTotalPrice()
        }
        this.setCartTotalPrice = this
            .setCartTotalPrice
            .bind(this)
    }

    getTotalPrice() {
        const cartItems = Object.keys(this.props.cart)
        let total = 0
        for (let i = 0; i < cartItems.length; i++) {
            total += this.props.cart[cartItems[i]].amount * this.props.cart[cartItems[i]].price
        }
        return total
    }

    setCartTotalPrice() {
        this.setState({
            total: this.getTotalPrice()
        })
    }

    render() {

        const cartItems = Object
            .keys(this.props.cart)
            .map((itemId) => {
                return (<CartItem
                    key={itemId}
                    index={itemId}
                    item={this.props.cart[itemId]}
                    setCartTotalPrice={this.setCartTotalPrice}
                    cartId={this.props.cartId}/>)

            })
        return (
            <div className="my-cart">
                <Navbar/>
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
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
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
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <button type="button" className="btn btn-default">
                                                <span className="glyphicon glyphicon-shopping-cart"></span>
                                                Continue Shopping
                                            </button>
                                        </td>
                                        <td>
                                            <button type="button" className="btn btn-success">
                                                Checkout
                                                <span className="glyphicon glyphicon-play"></span>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Cart;