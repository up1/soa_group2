import React from 'react'
import axios from 'axios';
import ProductItemPreview from '../ProductItemPreview'
import Navbar from '../UpperHeaderSection.jsx'
import Footer from '../FooterSection.jsx'
import '../css/catalog.css'

class SelectedCategory extends React.Component {

    constructor(props) {
        super(props)
        console.log("Nav to -> ", props.match.params.categoryName);
        this.state = {
            categoryName: props.match.params.categoryName,
            products: []
        }
        this.loadCategoryProduct = this.loadCategoryProduct.bind(this);
        this.loadCategoryProduct(props.match.params.categoryName);
    }

    loadCategoryProduct(categoryName) {
        axios
            .get(`http://localhost:9003/sale/category/${categoryName}`)
            .then((response) => {
                const productList = response
                    .data
                    .map((product, index) => <ProductItemPreview
                        width={4}
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        amount={product.amount}
                        detail={product.detail}
                        category={product.category.name}
                        editDate={product.editDate}
                        saleDate={product.editDate}
                        index={index}
                        addProduct={this.props.addProduct} />)
                this.setState({ products: productList })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <div id="catalog-page">
                <Navbar />
                <div className="container">
                    <h1> Welcome to {this.state.categoryName} Catalog </h1>
                    {this.state.products}
                </div>
                <Footer />
            </div>
        )
    }

}

export default SelectedCategory