import React from 'react';
import axios from 'axios';

class ListProduct extends React.Component {

    constructor() {

        super();
        this.state = {
            page: 0,
            products: []
        }
        this.deleteProduct = this.deleteProduct.bind(this);
        this.updateData = this.updateData.bind(this);
        this.updateData();
    }

    updateData() {
        axios.get("http://localhost:9001/product?page=" + this.state.page)
            .then(
            (response) => {
                const productList = response.data.map(
                    (product, index) =>
                        <li key={product.id} className="media">
                            <div className="media-left">
                                <a href="#">
                                    <img src={"http://localhost:9001/product/image/"+product.id} alt="monolith" className="media-object img-rounded" width="144px;" height="144px;" />
                                </a>
                            </div>
                            <div className="media-body">
                                <h4 className="media-heading"> {product.name} </h4>
                                <p className="product-detail"> {product.detail} </p>
                                <p> <strong> ราคา </strong> {product.price} บาท <strong>| จำนวน </strong> <span className="badge">{product.amount}</span></p>
                                <button className="btn btn-primary" type="button"><span className="glyphicon glyphicon-pencil"></span> แก้ไขข้อมูล</button>
                                <button className="btn btn-danger btn-delete" type="button" data={index} onClick={(e) => { this.deleteProduct(e, index) }}><span className="glyphicon glyphicon-remove"></span> ลบสินค้า</button>
                            </div> <hr />
                        </li>
                )
                this.setState({
                    products: productList
                })
            }
            )
            .catch(
            (error) => { console.log(error) }
            )
    }

    deleteProduct(e, index) {
        const products = this.state.products;
        console.log(products[index]);
        axios.delete('http://localhost:9001/product/' + products[index].key)
            .then(
            (response) => {
                this.updateData();
            }
            )
            .catch(
            (error) => { console.log(error) }
            )
    }

    render() {
        return (
            <div className="container">
                <h1>รายการสินค้า<a href="#" className="btn btn-lg btn-success pull-right"><span className="glyphicon glyphicon-plus-sign"></span>  เพิ่มสินค้า</a></h1><br/>
                <ul className="media-list">
                    {this.state.products}
                </ul>
                <div className="pull-right">
                    <nav aria-label="Page navigation">
                        <ul className="pagination">
                            <li>
                                <a href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li className="active"><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#">4</a></li>
                            <li><a href="#">5</a></li>
                            <li>
                                <a href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}

export default ListProduct;