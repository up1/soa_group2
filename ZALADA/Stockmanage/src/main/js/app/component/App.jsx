import React from 'react';
import {Link, BrowserRouter, Route, Switch} from 'react-router-dom';
import ListProduct from './ListProduct.jsx';
import UpdateProduct from './UpdateProduct.jsx';
import AddProduct from './AddProduct.jsx';
import NotificationSystem from 'react-notification-system';

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
            .addNotification({message: 'Notification message', level: 'success'})
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
                        <Route exact path="/" component={ListProduct}/>
                        <Route path="/add" component={AddProductwithNoti} noti={this.notifySuccessAddProduct} />
                        <Route path="/update" component={UpdateProduct} />
                    </Switch>
                </BrowserRouter>
            </div>

        )
    }
}

export default App;