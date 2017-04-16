import React from 'react';
import axios from 'axios';

class CartItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: props.item.amount
        }
        this.updateAmount = this
            .updateAmount
            .bind(this)
    }

    updateAmount(e) {
        const updatedItem = this.props.item;
        const amount = parseInt(e.target.value, 10)
        console.log("amount = " + amount)
        if(Number.isInteger(amount)){
            axios
            .patch(`http://localhost:9003/cart/${this.props.cartId}/${updatedItem.id}?amount=${amount}`)
            .then((response) => {
                const updatedItem = this.props.item;
                updatedItem['amount'] = amount
                this.setState({amount: amount})
                this
                    .props
                    .setCartTotalPrice()
            })
            .catch((error) => {
                console.log(error)
            })
        }
        else if(e.target.value === ""){
            const updatedItem = this.props.item;
            updatedItem['amount'] = e.target.value
            this.setState({amount : amount})
        }
        
    }

    render() {
        let amount = this.props.item.amount
        return (
            <tr>
                <td className="col-sm-8 col-md-6">
                    <div className="media">
                        <a className="thumbnail pull-left" href="#">
                            <img
                                className="media-object"
                                src="http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png"
                                alt="productname"
                                style={{
                                width: '72px',
                                height: '72px'
                            }}/>
                        </a>
                        <div className="media-body">
                            <h4 className="media-heading">
                                <a href="#">{this.props.item.name}</a>
                            </h4>
                            <h5 className="media-heading">
                                by
                                <a href="#">{this.props.owner}</a>
                            </h5>
                            <span>Status:
                            </span>
                            <span className="text-success">
                                <strong>In Stock</strong>
                            </span>
                        </div>
                    </div>
                </td>
                <td
                    className="col-sm-1 col-md-1"
                    style={{
                    textAlign: 'center'
                }}>
                    <input className="form-control" value={amount} onChange={this.updateAmount}/>
                </td>
                <td className="col-sm-1 col-md-1 text-center">
                    <strong>{this.props.item.price}</strong>
                </td>
                <td className="col-sm-1 col-md-1 text-center">
                    <strong>{this.props.item.price * this.props.item.amount}</strong>
                </td>
                <td className="col-sm-1 col-md-1">
                    <button type="button" className="btn btn-danger">
                        <span className="glyphicon glyphicon-remove"></span>
                        Remove
                    </button>
                </td>
            </tr>
        )
    }
}

export default CartItem;