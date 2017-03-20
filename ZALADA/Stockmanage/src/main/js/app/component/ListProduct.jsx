import React from 'react';
import axios from 'axios';
import Product from './Product.jsx';

class ListProduct extends React.Component {

    constructor() {

        super();
        this.state = {
            page: 0,
            products: [],
            pager: []
        }
        this.deleteProduct = this
            .deleteProduct
            .bind(this);
        this.updateData = this
            .updateData
            .bind(this);
        this.countDataItem = this
            .countDataItem
            .bind(this);
        this.goToAddProductPage = this
            .goToAddProductPage
            .bind(this);
        this.countDataItem();
        this.updateData()
    }

    updateImage(productId) {
        axios
            .get("http://localhost:9001/product/image/" + productId)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                console.log(error)
            })
    }

    goToAddProductPage(event) {
        event.preventDefault();
        this
            .context
            .router
            .transitionTo(`AddProduct`)
    }

    updateData() {
        axios
            .get("http://localhost:9001/product?page=" + this.state.page)
            .then((response) => {
                const productList = response
                    .data
                    .map((product, index) => <Product
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        detail={product.detail}
                        price={product.price}
                        amount={product.amount}
                        index={index}
                        deleteAction={this.deleteProduct}/>)
                this.setState({products: productList})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    countDataItem() {
        let pagerList = [];
        axios
            .get("http://localhost:9001/product")
            .then((response) => {
                const length = response.data.length;
                for (let i = 1; i <= Math.ceil(length / 10); i++) {
                    pagerList.push(
                        <li key={i}>
                            <a
                                href="#"
                                onClick={(n) => {
                                this.selectItemPage(i - 1)
                            }}>{i}</a>
                        </li>
                    )
                }
                this.setState({pager: pagerList})
                this.updateData();
            })
            .catch((error) => {
                console.log(error)
            })
    }

    deleteProduct(e, index) {
        const products = this.state.products;
        console.log(products[index])
        axios
            .delete('http://localhost:9001/product/' + products[index].props.id)
            .then((response) => {
                this.updateData();
            })
            .catch((error) => {
                console.log(error)
            })
    }

    selectItemPage(pageNumber) {
        this.state.page = pageNumber;
        this.updateData();
        return false;
    }

    render() {
        return (
            <div className="container">
                <h1>รายการสินค้า<a
                    onClick={this.goToAddProductPage}
                    href="#"
                    className="btn btn-lg btn-success pull-right">
                        <span className="glyphicon glyphicon-plus-sign"></span>
                        เพิ่มสินค้า</a>
                </h1><br/>
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
                            {this.state.pager}
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

ListProduct.contextTypes = {
    router: React.PropTypes.object
}

export default ListProduct;