import React from 'react';
import axios from 'axios';

class ListProduct extends React.Component{

    constructor(){

        super();
        this.state = {
            page : 0,
            products : []
        }
        this.deleteProduct = this.deleteProduct.bind(this);
        this.updateData = this.updateData.bind(this);
        this.updateData();
    }

    updateData(){
        axios.get("http://localhost:9001/product?page="+this.state.page)
        .then( 
            (response) => {
            const productList = response.data.map(
                    (product, index) => 
                    <li key={product.id}>
                        {product.name} 
                        <button 
                        data={index} 
                        type="button" 
                        onClick={(e) => {this.deleteProduct(e, index)}}>
                        delete
                        </button>
                    </li>
                    )
                this.setState({
                    products : productList
                })
            }
        )
        .catch(
            (error) => {console.log(error)}
        )
    }

    deleteProduct(e, index){
        const products = this.state.products;
        console.log(products[index]);
        axios.delete('http://localhost:9001/product/'+products[index].key)
        .then(
            (response) => {
                this.updateData();
            }
        )
        .catch(
            (error) => {console.log(error)}
        )
    }

    render(){
        return (
            <div>
                <ul>
                    <h1> Product List</h1>
                    {this.state.products}
                </ul>
            </div>
        )
    }
}

export default ListProduct;