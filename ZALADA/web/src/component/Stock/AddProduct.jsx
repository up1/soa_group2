import React from 'react';
import axios from 'axios';
import './css/add-product-style.css';

class AddProduct extends React.Component {

  constructor() {
    super();
    this.state = {
      imagefile: '',
      imagePreviewUrl: '',
      name: '',
      detail: '',
      price: '',
      amount: '',
      category: '',
    };
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
  }

  handleSubmit(event) {
    this
      .props
      .noti();

    const data = {
      name: this.state.name,
      detail: this.state.detail,
      price: this.state.price,
      amount: this.state.amount,
      category: {
        name: this.state.category,
      },
    };
    console.log(data);
    axios
      .post('http://localhost:9001/product', data)
      .then((response) => {
        console.log('success');
        console.log(response.data);
        const productId = response.data;
        this.uploadImage(productId);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  uploadImage(productId) {
    const instance = axios.create();
    const data = new FormData();
    data.append('file', this.state.imagefile);
    data.append('productId', productId);
    instance
      .post('http://localhost:9001/product/image', data)
      .then((response) => {
        console.log('test');
        this
          .context
          .router
          .history
          .push('/stock');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange(event) {
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  handleImageChange(event) {
    event.preventDefault();
    const reader = new FileReader();
    console.log(event.target);
    const file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({ imagefile: file, imagePreviewUrl: reader.result });
    };

    reader.readAsDataURL(file);
  }

  /*
        <label  htmlFor="file-input"> กรุณาเลือกรูปภาพสินค้า </label>

    */

  render() {
    let previewImage = null;
    if (this.state.imagePreviewUrl) {
      previewImage = (<img
        src={this.state.imagePreviewUrl}
        className="img-responsive center-block"
        alt="product"
      />);
    } else {
      previewImage = (
        <h3>
          <span className="glyphicon glyphicon-upload" aria-hidden="true" />
          กรุณาเลือกรูปภาพสินค้า</h3>
      );
    }
    return (
      <div className="container">
        <h1>
          ลงขายสินค้า
        </h1>
        <div className="preview">
          {previewImage}
          <br />
        </div>
        <form>
          <div className="form-group">
            <input type="file" onChange={this.handleImageChange} id="file-input" />
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
              className="form-control"
            />
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
              className="form-control"
            />
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
              max="1000000"
            />
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
              className="form-control"
            >
              <option disabled />
              <option value="Mobile Phone and Tablet">Mobile Phone and Tablet</option>
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
              max="100"
            />
          </div>
          <a
            href="#"
            onClick={this.handleSubmit}
            className="btn btn-primary btn-lg pull-right"
          >
            Submit
          </a>
        </form>
      </div>
    );
  }
}

AddProduct.contextTypes = {
  router: React.PropTypes.object,
};

export default AddProduct;
