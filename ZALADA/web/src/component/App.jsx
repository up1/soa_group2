import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import ListProduct from './Stock/ListProduct.jsx';
import UpdateProduct from './Stock/UpdateProduct.jsx';
import AddProduct from './Stock/AddProduct.jsx';
import NotificationSystem from 'react-notification-system';
import MainPage from './Sale/MainPage.jsx';
import CartPage from './Sale/Cart/Cart.jsx';
import LoginPage from './LoginPage.jsx';
import SignUpPage from './SignUpPage.jsx';
import ReactTooltip from 'react-tooltip'
import CartItem from './Sale/Cart/CartItem.jsx';

class App extends React.Component {
    
    constructor(){
        super();
        this.state = {
            username : null,
            cart : { 1: {
             id : 1,
             name :"Test",
             detail:"test",
             price: 500, 
             amount:1,
             owner:"Me"
        }}
        }
        this.notifySuccessAddProduct = this.notifySuccessAddProduct.bind(this);
        this.updateUser = this.updateUser.bind(this)
        const mockCartItem = {
             id : 1,
             name :"Test",
             detail:"test",
             price: 500, 
             amount:1,
             owner:"Me"
        }
        this.updateCartItem = this.updateCartItem.bind(this)
        this.addToCart = this.addToCart.bind(this)
        this.removeFromCart = this.removeFromCart.bind(this)
    }

    addToCart(cartItem){
        const current_cart = {...this.state.cart}
        current_cart[cartItem.id] = cartItem;
        this.setState({current_cart})
    }

    removeFromCart(itemId){
        const current_cart = {...this.state.cart}
        current_cart[itemId] = null;
        this.setState({current_cart})
    }

    updateCartItem(itemId, cartItem){
        const current_cart = {...this.state.cart}
        current_cart[itemId] = cartItem;
        this.setState({current_cart})
    }

    updateUser(username){
        this.setState({
            username : username
        })
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
            return (<SignUpPage updateUser={this.updateUser}/>)
        }
        const WrapMainPage = (prop) => {
            return (<MainPage user={this.state.username}/>)
        }
        const MycartPage = (prop) => {
            return (<CartPage removeFromCart={this.removeFromCart} {...prop} 
            updateCartItem={this.updateCartItem} cart={this.state.cart}/>)
        }
        
        return (
            <div>
                <NotificationSystem ref="notificationSystem"/>
                <ReactTooltip />
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" render={WrapMainPage}/>
                        <Route path="/add" render={AddProductwithNoti}/>
                        <Route path="/update/:id" render={UpdateProduct} />
                        <Route path="/login" render={WrapSignIn}/>
                        <Route path="/signup" render={WrapSignUp}/>
                        <Route path="/stock" component={ListProduct}/>
                        <Route path="/cart" component={MycartPage}/>
                    </Switch>
                </BrowserRouter>
            </div>

        )
    }
}

export default App;