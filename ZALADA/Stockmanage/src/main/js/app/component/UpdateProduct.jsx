import React from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';

class UpdateProduct extends React.Component {

    constructor(props) {
        super(props)
        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleImageChange = this
            .handleImageChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
        this.uploadImage = this
            .uploadImage
            .bind(this);
        this.loadProductData = this
            .loadProductData
            .bind(this);
        this.loadProductData(props.match.params.id);
        this.state = {
            imagefile: '',
            imagePreviewUrl: `http://localhost:9001/product/image/${props.match.params.id}`,
            name: '',
            detail: '',
            price: '',
            amount: '',
            category: ''
        }
    }

    handleSubmit(event) {
        const data = {
            name: this.state.name,
            detail: this.state.detail,
            price: this.state.price,
            amount: this.state.amount,
            category: this.state.category
        }
        //console.log(data);
        axios
            .put(`http://localhost:9001/product/${this.props.match.params.id}`, data)
            .then((response) => {
                if (this.state.imagefile) {
                    this.uploadImage(this.props.match.params.id);
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }

    uploadImage(productId) {
        const instance = axios.create();
        let data = new FormData();
        data.append('file', this.state.imagefile)
        data.append('productId', productId)
        instance
            .post("http://localhost:9001/product/image", data)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    handleChange(event) {
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    handleImageChange(event) {
        event.preventDefault();
        let reader = new FileReader();
        console.log(event.target);
        let file = event.target.files[0];

        reader.onloadend = () => {
            this.setState({imagefile: file, imagePreviewUrl: reader.result});
        }

        reader.readAsDataURL(file);
    }

    /*
        <label  htmlFor="file-input"> กรุณาเลือกรูปภาพสินค้า </label>

    */

    loadProductData(id) {
        axios
            .get(`http://localhost:9001/product/${id}`)
            .then((response) => {
                console.log(response.data);
                const newState = {}
                    newState['name'] = response.data.name,
                    newState['detail'] = response.data.detail,
                    newState['price'] = response.data.price,
                    newState['amount'] = response.data.amount,
                    newState['category'] = response.data.category.name
                    this.setState(newState);
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        render() {
            let previewImage = null;
            if (this.state.imagePreviewUrl) {
                previewImage = (<img
                    src={this.state.imagePreviewUrl}
                    className="img-responsive center-block"
                    alt="product image"/>)
            } else {
                previewImage = (
                    <h3>
                        <span className="glyphicon glyphicon-upload" aria-hidden="true"></span>
                        กรุณาเลือกรูปภาพสินค้า</h3>
                )
            }
            return (
                <div className="container">
                    <h1>
                        แก้ไขข้อมูลสินค้า
                    </h1>
                    <hr/>
                    <div className="preview">
                        {previewImage}
                        <br/>
                    </div>
                    <form>
                        <div className="form-group">
                            <input type="file" onChange={this.handleImageChange} id="file-input"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">
                                <h3>
                                    ชื่อสินค้า
                                </h3>
                            </label>
                            <input
                                name="name"
                                id="name"
                                onChange={this.handleChange}
                                required
                                type="text"
                                value={this.state.name}
                                className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="detail">
                                <h3>รายละเอียดสินค้า</h3>
                            </label>
                            <input
                                name="detail"
                                id="detail"
                                onChange={this.handleChange}
                                required
                                type="text"
                                value={this.state.detail}
                                className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">
                                <h3>ราคา (บาท)</h3>
                            </label>
                            <input
                                name="price"
                                id="price"
                                onChange={this.handleChange}
                                required
                                type="number"
                                value={this.state.price}
                                className="form-control"
                                min="1"
                                max="1000000"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">
                                <h3>ประเภทของสินค้า</h3>
                            </label>
                            <select
                                name="category"
                                id="category"
                                onChange={this.handleChange}
                                value={this.state.category}
                                className="form-control">
                                <option disabled></option>
                                <option value="Mobile Phone and Tablet">"Mobile Phone and Tablet</option>
                                <option value="Mobile Phone">Mobile Phone</option>
                                <option value="Tablet">Tablet</option>
                                <option value="Mobile Accessory">Mobile Accessory</option>
                                <option value="Backup Battery">Backup Battery</option>
                                <option value="Battery and Charging Accessory">Battery and Charging Accessory</option>
                                <option value="Mobile Case">Mobile Case</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="amount">
                                <h3>จำนวนของสินค้า (ชิ้น)</h3>
                            </label>
                            <input
                                name="amount"
                                id="amount"
                                onChange={this.handleChange}
                                required
                                type="number"
                                value={this.state.amount}
                                className="form-control"
                                min="1"
                                max="100"/>
                        </div>
                        <Link
                            to="/"
                            onClick={this.handleSubmit}
                            className="btn btn-primary btn-lg pull-right"
                            type="button">Submit</Link>
                    </form>
                </div>
            )
        }
    }

    export default UpdateProduct;