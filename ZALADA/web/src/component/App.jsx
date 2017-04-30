import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import cookie from 'react-cookie';
import ReactTooltip from 'react-tooltip';
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
import { SaleService } from '../util/AxiosWrapper';

class App extends React.Component {

  constructor() {
    super();
    const user = cookie.load('user');
    this.state = {
      username: user,
      cart: {},
      cartId: null,
    };
    this.notifySuccessAddProduct = this
      .notifySuccessAddProduct
      .bind(this);
    this.userLogin = this
      .userLogin
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
    if (this.state.username) {
      const userCartId = cookie.load('cartid');
      if (userCartId) {
        this.getCartInfo(userCartId);
      }
    } else {
      const cartId = cookie.load('cartid');
      if (cartId) {
        this.getCartInfo(cartId);
      } else {
        this.createCart(0, null);
      }
    }
  }

  getCartInfo(cartId) {
    SaleService
      .get(`cart/${cartId}`, {
        headers: { Authorization: cookie.load('access_token') },
      })
      .then((response) => {
        console.log(response.data);
        const storedCartItems = response.data.products;
        const newCart = {};
        for (let i = 0; i < storedCartItems.length; i += 1) {
          newCart[storedCartItems[i].id] = storedCartItems[i];
        }
        cookie.save('cartid', cartId);
        this.setState({ cartId: response.data.id, cart: newCart });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  createCart(userType, username) {
    let endpoint;
    if (userType !== '0') {
      endpoint = `cart?usertype=${userType}`;
    } else if (userType === '1') {
      endpoint = `cart?usertype=${userType}&username=${username}`;
    }
    console.log(endpoint);
    SaleService
          .post(endpoint, {}, {
            headers: { Authorization: cookie.load('access_token') },
          })
          .then((response) => {
            const generatedCartId = response.data;
            cookie.save('cartid', generatedCartId);
            this.setState({ cartId: generatedCartId, cart: [] });
          })
          .catch((error) => {
            console.log(error);
          });
  }

  addToCart(cartItem) {
    SaleService
      .post(`cart/${this.state.cartId}?productId=${cartItem.id}&amount=${cartItem.amount}`, {}, {
        headers: { Authorization: cookie.load('access_token') },
      })
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
    SaleService
      .delete(`cart/${this.state.cartId}?productId=${itemId}`, {
        headers: { Authorization: cookie.load('access_token') },
      })
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
    SaleService
      .put(`cart/${this.state.cartId}`, cartData, {
        headers: { Authorization: cookie.load('access_token') },
      })
      .then(() => {
        this.setState({ cart: [] });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  userLogin(username, accessToken, cartId) {
    cookie.save('access_token', accessToken);
    this.getCartInfo(cartId);
    cookie.save('user', username);
    this.setState({ username });
  }

  userLogout() {
    cookie.remove('access_token');
    cookie.remove('user');
    cookie.remove('cartid');
    this.setState({ username: null });
    this.createCart(0, null);
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
    (<LoginPage userLogin={this.userLogin} {...prop} user={this.state.username} />);
    const WrapSignUp = prop =>
    (<SignUpPage {...prop} user={this.state.username} />);
    const WrapMainPage = prop =>
    (<MainPage user={this.state.username} {...prop} addProduct={this.addToCart} />);
    const MycartPage = prop => (<CartPage
      removeFromCart={this.removeFromCart}
      {...prop}
      user={this.state.username}
      cartId={this.state.cartId}
      cart={this.state.cart}
    />);

    const WrapCategoryPage = prop =>
     (<SelectedCategory addProduct={this.addToCart} {...prop} user={this.state.username} />);

    const SubmitCartForm = prop =>
    (<ConfirmForm
      cart={this.state.cart} user={this.state.username}
      {...prop} clearCart={this.clearCart}
    />);

    return (
      <div>
        <NotificationSystem ref={(noti) => { this.notificationSystem = noti; }} />
        <ReactTooltip />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={WrapMainPage} />
            <Route path="/add" render={AddProductwithNoti} />
            <Route path="/update/:id" component={UpdateProduct} />
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
