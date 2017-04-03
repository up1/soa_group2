import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import ListProduct from './Stock/ListProduct.jsx';
import UpdateProduct from './Stock/UpdateProduct.jsx';
import AddProduct from './Stock/AddProduct.jsx';
import LoginForm from './Sale/LoginForm.jsx';
import NotificationSystem from 'react-notification-system';
import MainPage from './Sale/MainPage.jsx';
import LoginPage from './LoginPage.jsx';

class App extends React.Component {
    
    constructor(){
        super();
        this.notifySuccessAddProduct = this.notifySuccessAddProduct.bind(this);
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

        return (
            <div>
                <NotificationSystem ref="notificationSystem"/>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={MainPage}/>
                        <Route path="/add" component={AddProductwithNoti}/>
                        <Route path="/update/:id" component={UpdateProduct} />
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/stock" component={ListProduct}/>
                    </Switch>
                </BrowserRouter>
            </div>

        )
    }
}

export default App;