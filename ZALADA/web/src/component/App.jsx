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
import ChooseAddress from './Sale/ChooseAddress';
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
    this.userLogout = this.userLogout.bind(this);
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
    const config = this.state.username ? {
      headers: { Authorization: cookie.load('access_token') },
    } : {};
    console.log(config);
    SaleService
      .get(`cart/${cartId}`, config)
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
        this.userLogout();
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
          .post(endpoint, {})
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
    const config = this.state.username ? {
      headers: { Authorization: cookie.load('access_token') },
    } : {};
    SaleService
      .post(`cart/${this.state.cartId}?productId=${cartItem.id}&amount=${cartItem.amount}`, {}, config)
      .then(() => {
        const currentCart = {
          ...this.state.cart,
        };
        currentCart[cartItem.id] = cartItem;
        this
      .notificationSystem
      .addNotification({ message: 'เพิ่มสินค้าเข้าสู่ตะกร้าเรียบร้อยแล้ว', level: 'success' });
        this.setState({ cart: currentCart });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  removeFromCart(itemId) {
    const config = this.state.username ? {
      headers: { Authorization: cookie.load('access_token') },
    } : {};
    SaleService
      .delete(`cart/${this.state.cartId}?productId=${itemId}`, config)
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
    const config = this.state.username ? {
      headers: { Authorization: cookie.load('access_token') },
    } : {};
    const cartData = {
      products: [],
    };
    SaleService
      .put(`cart/${this.state.cartId}`, cartData, config)
      .then(() => {
        this.setState({ cart: [] });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  userLogin(username, accessToken, cartId) {
    console.log(username);
    cookie.save('access_token', accessToken);
    cookie.save('user', username);
    this.setState({ username });
    this.getCartInfo(cartId);
  }

  userLogout() {
    cookie.remove('access_token');
    cookie.remove('user');
    cookie.remove('cartid');
    this.setState({ username: '' });
    this.createCart(0, null);
  }


  notifySuccessAddProduct() {
    this
      .notificationSystem
      .addNotification({ message: 'Add Product Success', level: 'success' });
  }

  render() {

    const ChooseAddressWrap = prop =>
    (<ChooseAddress user={this.state.username} {...prop} userLogout={this.userLogout} clearCart={this.clearCart} cart={this.state.cart} />);
    const AddProductwithNoti = prop =>
    (<AddProduct noti={this.notifySuccessAddProduct} {...prop} />);
    const WrapSignIn = prop =>
    (<LoginPage userLogin={this.userLogin} {...prop} user={this.state.username} userLogout={this.userLogout} />);
    const WrapSignUp = prop =>
    (<SignUpPage {...prop} user={this.state.username} userLogout={this.userLogout} />);
    const WrapMainPage = prop =>
    (<MainPage user={this.state.username} {...prop} addProduct={this.addToCart} userLogout={this.userLogout} />);
    const MycartPage = prop => (<CartPage
      removeFromCart={this.removeFromCart}
      {...prop}
      user={this.state.username}
      cartId={this.state.cartId}
      cart={this.state.cart}
      userLogout={this.userLogout}
    />);

    const WrapMainCategoryPage = prop =>
    (<CategoryPage {...prop} user={this.state.username} userLogout={this.userLogout} />);

    const WrapCategoryPage = prop =>
     (<SelectedCategory addProduct={this.addToCart} {...prop} user={this.state.username} userLogout={this.userLogout} />);

    const SubmitCartForm = prop =>
    (<ConfirmForm
      cart={this.state.cart} user={this.state.username}
      {...prop} clearCart={this.clearCart}
      userLogout={this.userLogout}
    />);

    const PdfForm = prop => 
    (
      <PurchaseOrder 
      user={this.state.username}
      userLogout={this.userLogout}
      {...prop}
      />
    );

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
            <Route exact path="/category" render={WrapMainCategoryPage} />
            <Route path="/category/:categoryName" render={WrapCategoryPage} />
            <Route path="/submit" render={SubmitCartForm} />
            <Route path="/purchaseorder/:purchaseOrderId" render={PdfForm} />
            <Route path="/chooseaddress" render={ChooseAddressWrap} />
          </Switch>
        </BrowserRouter>
      </div>

    );
  }
}

export default App;
