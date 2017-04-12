import React from 'react';

class CartItem extends React.Component {

    constructor() {
        super()
        this.state = {
            name,
            detail,
            price,
            amount,
            owner,
        }
    }

    render() {
        return (
            <tr>
                <td className="col-sm-8 col-md-6">
                    <div className="media">
                        <a className="thumbnail pull-left" href="#">
                            <img
                                className="media-object"
                                src="http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png"
                                style={{
                                width: '72px',
                                height: '72px'
                            }}/>
                        </a>
                        <div className="media-body">
                            <h4 className="media-heading">
                                <a href="#">{this.state.name}</a>
                            </h4>
                            <h5 className="media-heading">
                                by
                                <a href="#">{this.state.owner}</a>
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
                    <input type="email" className="form-control" id="exampleInputEmail1"/>
                </td>
                <td className="col-sm-1 col-md-1 text-center">
                    <strong>{this.state.price}</strong>
                </td>
                <td className="col-sm-1 col-md-1 text-center">
                    <strong>{this.state.price * this.state.amount}</strong>
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