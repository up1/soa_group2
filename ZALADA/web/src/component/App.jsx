import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import cookie from 'react-cookie';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import NotificationSystem from 'react-notification-system';
import ListProduct from './Stock/ListProduct';
import UpdateProduct from './Stock/UpdateProduct';
import AddProduct from './Stock/AddProduct';
import MainPage from './Sale/MainPage';
import CartPage from './Sale/Cart/Cart';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import CategoryPage from './Sale/Category/CategoryPage';
import SelectedCategory from './Sale/Category/SelectedCategory';
import PurchaseOrder from '././Sale/PurchaseOrder';
import ConfirmForm from './Sale/ConfirmForm';

class App extends React.Component {

  constructor() {
    super();
    const user = cookie.load('user');
    if (user) {
      const userCartId = cookie.load('cartid');
      if (userCartId) {
        this.getCartInfo(userCartId);
      } else {
        this.createCart(1, user);
      }
    } else {
      const cartId = cookie.load('cartid');
      if (cartId) {
        this.getCartInfo(cartId);
      } else {
        this.createCart(0, null);
      }
    }
    this.state = {
      username: user,
      cart: {},
      cartId: null,
    };
    this.notifySuccessAddProduct = this
      .notifySuccessAddProduct
      .bind(this);
    this.updateUser = this
      .updateUser
      .bind(this);
    this.addToCart = this
      .addToCart
      .bind(this);
    this.removeFromCart = this
      .removeFromCart
      .bind(this);
    this.getCartInfo = this
      .getCartInfo
      .bind(this);
    this.clearCart = this
      .clearCart
      .bind(this);
  }

  componentDidMount() {

  }

  getCartInfo(cartId) {
    axios
      .get(`http://localhost:9003/cart/${cartId}`)
      .then((response) => {
        console.log(response.data);
        const storedCartItems = response.data.products;
        const newCart = {};
        for (let i = 0; i < storedCartItems.length; i += 1) {
          newCart[storedCartItems[i].id] = storedCartItems[i];
        }
        this.setState({ cart: newCart });
        this.setState({ cartId: response.data.id });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  createCart(userType, username) {
    let endpoint;
    if (userType !== 0) {
      endpoint = `http://localhost:9003/cart?usertype=${userType}`;
    } else if (userType === 1) {
      endpoint = `http://localhost:9003/cart?usertype=${userType}&username=${username}`;
    }
    axios
          .post(endpoint)
          .then((response) => {
            const generatedCartId = response.data;
            cookie.save('cartid', generatedCartId);
            this.setState({ cartId: generatedCartId });
          })
          .catch((error) => {
            console.log(error);
          });
  }

  addToCart(cartItem) {
    axios
      .post(`http://localhost:9003/cart/${this.state.cartId}?productId=${cartItem.id}&amount=${cartItem.amount}`)
      .then(() => {
        const currentCart = {
          ...this.state.cart,
        };
        currentCart[cartItem.id] = cartItem;
        this.setState({ cart: currentCart });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  removeFromCart(itemId) {
    axios
      .delete(`http://localhost:9003/cart/${this.state.cartId}?productId=${itemId}`)
      .then(() => {
        const currentCart = {
          ...this.state.cart,
        };
        console.log(currentCart);
        delete currentCart[itemId];
        this.setState({ cart: currentCart });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  clearCart() {
    const cartData = {
      products: [],
    };
    axios
      .put(`http://localhost:9003/cart/${this.state.cartId}`, cartData)
      .then(() => {
        this.setState({ cart: [] });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateUser(username) {
    this.setState({ username });
  }


  notifySuccessAddProduct() {
    this
      .notificationSystem
      .addNotification({ message: 'Add Product Success', level: 'success' });
  }

  render() {
    const AddProductwithNoti = prop =>
    (<AddProduct noti={this.notifySuccessAddProduct} {...prop} />);

    const WrapSignIn = prop =>
    (<LoginPage updateUser={this.updateUser} {...prop} />);
    const WrapSignUp = prop =>
    (<SignUpPage updateUser={this.updateUser} {...prop} />);
    const WrapMainPage = prop =>
    (<MainPage user={this.state.username} {...prop} addProduct={this.addToCart} />);
    const MycartPage = prop => (<CartPage
      removeFromCart={this.removeFromCart}
      {...prop}
      cartId={this.state.cartId}
      cart={this.state.cart}
    />);

    const WrapCategoryPage = prop => (<SelectedCategory addProduct={this.addToCart} {...prop} />);

    const SubmitCartForm = prop =>
    (<ConfirmForm cart={this.state.cart} {...prop} clearCart={this.clearCart} />);

    return (
      <div>
        <NotificationSystem ref={(noti) => { this.notificationSystem = noti; }} />

        <ReactTooltip />

        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={WrapMainPage} />
            <Route path="/add" render={AddProductwithNoti} />
            <Route path="/update/:id" render={UpdateProduct} />
            <Route path="/login" render={WrapSignIn} />
            <Route path="/signup" render={WrapSignUp} />
            <Route path="/stock" component={ListProduct} />
            <Route path="/cart" render={MycartPage} />
            <Route exact path="/category" component={CategoryPage} />
            <Route path="/category/:categoryName" render={WrapCategoryPage} />
            <Route path="/submit" render={SubmitCartForm} />
            <Route path="/purchaseorder/:purchaseOrderId" component={PurchaseOrder} />
          </Switch>
        </BrowserRouter>
      </div>

    );
  }
}

export default App;
