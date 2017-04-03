import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import ListProduct from './Stock/ListProduct.jsx';
import UpdateProduct from './Stock/UpdateProduct.jsx';
import AddProduct from './Stock/AddProduct.jsx';
import LoginForm from './Sale/LoginForm.jsx';
import NotificationSystem from 'react-notification-system';
import MainPage from './Sale/MainPage.jsx';
import CartPage from './Sale/Cart/Cart.jsx';
import LoginPage from './LoginPage.jsx';
import SignUpPage from './SignUpPage.jsx';
import ReactTooltip from 'react-tooltip'

class App extends React.Component {
    
    constructor(){
        super();
        this.state = {
            username : null
        }

        this.notifySuccessAddProduct = this.notifySuccessAddProduct.bind(this);
        this.updateUser = this.updateUser.bind(this)
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
        const AddProductwithNoti = () => {
            return (<AddProduct noti={this.notifySuccessAddProduct}/>)
        }
        const WrapSignIn = () => {
            return (<LoginPage updateUser={this.updateUser}/>)
        }
        const WrapSignUp = () => {
            return (<SignUpPage updateUser={this.updateUser}/>)
        }
        const WrapMainPage = () => {
            return (<MainPage user={this.state.username}/>)
        }
        return (
            <div>
                <NotificationSystem ref="notificationSystem"/>
                <ReactTooltip />
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={WrapMainPage}/>
                        <Route path="/add" component={AddProductwithNoti}/>
                        <Route path="/update/:id" component={UpdateProduct} />
                        <Route path="/login" component={WrapSignIn}/>
                        <Route path="/signup" component={WrapSignUp}/>
                        <Route path="/stock" component={ListProduct}/>
                        <Route path="/cart" component={CartPage}/>
                    </Switch>
                </BrowserRouter>
            </div>

        )
    }
}

export default App;