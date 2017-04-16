import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ListProduct from './Stock/ListProduct.jsx';
import UpdateProduct from './Stock/UpdateProduct.jsx';
import AddProduct from './Stock/AddProduct.jsx';
import NotificationSystem from 'react-notification-system';
import MainPage from './Sale/MainPage.jsx';
import CartPage from './Sale/Cart/Cart.jsx';
import LoginPage from './LoginPage.jsx';
import SignUpPage from './SignUpPage.jsx';
import CategoryPage from './Sale/Category/CategoryPage.jsx';
import  SelectedCategory from './Sale/Category/SelectedCategory.jsx'
import cookie from 'react-cookie'
import ReactTooltip from 'react-tooltip';
import axios from 'axios'

class App extends React.Component {

    constructor() {
        super();
        const user = cookie.load("user")
        if (user) {
            const userCartId = cookie.load('cartid')
            if (userCartId) {
                this.getCartInfo(userCartId)
            } else {
                this.createCart(1, user)
            }
        } else {
            const cartId = cookie.load('cartid')
            if (cartId) {
                this.getCartInfo(cartId)
            } else {
                this.createCart(0, null)
            }
        }
        this.state = {
            username: null,
            cart: {},
            cartId: null
        }
        this.notifySuccessAddProduct = this
            .notifySuccessAddProduct
            .bind(this);
        this.updateUser = this
            .updateUser
            .bind(this)
        this.addToCart = this
            .addToCart
            .bind(this)
        this.removeFromCart = this
            .removeFromCart
            .bind(this)
        this.getCartInfo = this
            .getCartInfo
            .bind(this)
    }

    createCart(userType, username) {
        axios
            .post(`http://localhost:9003/cart?userType=${userType}`)
            .then((response) => {
                const generatedCartId = response.data
                cookie.save("cartid", generatedCartId)
                this.setState({cartId: generatedCartId})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getCartInfo(cartId) {
        axios
            .get(`http://localhost:9003/cart/${cartId}`)
            .then((response) => {
                console.log(response.data)
                const storedCartItems = response.data.products
                const newCart = {}
                for (let i = 0; i < storedCartItems.length; i++) {
                    newCart[storedCartItems[i].id] = storedCartItems[i]
                }
                this.setState({cart: newCart})
                this.setState({cartId: response.data.id})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    addToCart(cartItem) {
        axios
            .post(`http://localhost:9003/cart/${this.state.cartId}?productId=${cartItem.id}&amount=1`)
            .then((response) => {
                const current_cart = {
                    ...this.state.cart
                }
                current_cart[cartItem.id] = cartItem;
                this.setState({cart: current_cart})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    removeFromCart(itemId) {
        const current_cart = {
            ...this.state.cart
        }
        current_cart[itemId] = null;
        this.setState({current_cart})
    }

    updateUser(username) {
        this.setState({username: username})
    }

    componentDidMount() {
        this.notificationSystem = this.refs.notificationSystem;
    }

    notifySuccessAddProduct() {
        this
            .notificationSystem
            .addNotification({message: 'Add Product Success', level: 'success'})
    }

    render() {
        const AddProductwithNoti = (prop) => {
            return (<AddProduct noti={this.notifySuccessAddProduct} {...prop}/>)
        }
        const WrapSignIn = (prop) => {
            return (<LoginPage updateUser={this.updateUser} {...prop}/>)
        }
        const WrapSignUp = (prop) => {
            return (<SignUpPage updateUser={this.updateUser} AddProd/>)
        }
        const WrapMainPage = (prop) => {
            return (<MainPage user={this.state.username} {...prop} addProduct={this.addToCart}/>)
        }
        const MycartPage = (prop) => {
            return (<CartPage
                removeFromCart={this.removeFromCart}
                {...prop}
                cartId={this.state.cartId}
                cart={this.state.cart}/>)
        }

        return (
            <div>
                <NotificationSystem ref="notificationSystem"/>
                <ReactTooltip/>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" render={WrapMainPage}/>
                        <Route path="/add" render={AddProductwithNoti}/>
                        <Route path="/update/:id" render={UpdateProduct}/>
                        <Route path="/login" render={WrapSignIn}/>
                        <Route path="/signup" render={WrapSignUp}/>
                        <Route path="/stock" component={ListProduct}/>
                        <Route path="/cart" render={MycartPage}/>
                        <Route path="/category" component={CategoryPage}/>
                        <Route path="/cart" component={MycartPage}/>
                        <Route path="/category/:categoryName" render={SelectedCategory}/>
                    </Switch>
                </BrowserRouter>
            </div>

        )
    }
}

export default App;