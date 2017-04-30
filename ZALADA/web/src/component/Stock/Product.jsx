import React from 'react';
import { Link } from 'react-router-dom';

class Product extends React.Component {

  render() {
    return (
      <li className="media">
        <div className="media-left">
          <a href="#">
            <img
              src={`http://139.59.102.212:9001/product/image/${this.props.id}`}
              alt={this.props.name}
              className="media-object img-rounded"
              width="144px;"
              height="144px;"  
            />
          </a>
        </div>
        <div className="media-body">
          <h4 className="media-heading">
            {this.props.name}
          </h4>
          <p className="product-detail">
            {this.props.detail}
          </p>
          <p>
            <strong>
              ราคา
            </strong>
            {this.props.price}
            บาท
            <strong>| จำนวน
            </strong>
            <span className="badge">{this.props.amount}</span>
          </p>
          <Link to={`update/${this.props.id}`} className="btn btn-primary">
            <span className="glyphicon glyphicon-pencil" />
            แก้ไขข้อมูล</Link>
          <button
            className="btn btn-danger btn-delete"
            type="button"
            onClick={(e) => {
              this
              .props
              .deleteAction(e, this.props.index);
            }}
          >
            <span className="glyphicon glyphicon-remove" />
            ลบสินค้า</button>
        </div>
        <hr  />
      </li>
    );
  }
}

Product.contextTypes = {
  router: React.PropTypes.object,
};

export default Product;
