import React from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import 'react-rangeslider/lib/index.css'
import './css/dialog.css'
import Slider from 'react-rangeslider'
import FontAwesome from 'react-fontawesome'

class ProductDetail extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            amountValue: 1
        }
    }

    state = {
        isShowingModal: false
    }

    handleSliderChange = (value) => {
        this.setState({
            amountValue: value
        })
    }

    handleSliderChangeComplete = (e) => {
        console.log('Change event completed')
    }

    handleClick = () => {
        this.setState({ isShowingModal: true })
        const container = document.querySelector(".container");
        const slider = document.querySelector("#slider");
        const footer = document.querySelector("#footer-section");
        container.className += " blur";
        if (slider !== null && footer !== null) {
            slider.className += "blur";
            footer.className += "blur";
        }

    }
    handleClose = () => {
        const container = document.querySelector(".container")
        const slider = document.querySelector("#slider")
        const footer = document.querySelector("#footer-section")
        container.classList.remove("blur")
        if (slider !== null && footer !== null) {
            slider.classList.remove("blur")
            footer.classList.remove("blur")
        }
        this.setState({ isShowingModal: false })
    }

    render() {
        return <div onClick={this.handleClick}>
            <span>Detail</span>
            {
                this.state.isShowingModal &&
                <ModalContainer onClose={this.handleClose}>
                    <ModalDialog onClose={this.handleClose}>
                        <h1><FontAwesome name="info-circle" /> {this.props.productData.name}</h1>
                        <img src={`http://139.59.102.212:9001/product/image/productId=${this.props.productData.id}`} className="img-responsive img-rounded" alt={`${this.props.productData.name}`} />
                        <h3>ประเภทสินค้า : <small>{this.props.productData.category}</small></h3><hr />
                        <h3>รายละเอียด :</h3>
                        <p>
                            {this.props.productData.detail}
                        </p><hr />
                        <h3>ราคา : <small>{this.props.productData.price} บาท</small></h3><hr />
                        <big className="pull-left"> จำนวน {this.state.amountValue} ชิ้น </big><br />
                        <div className='slider'>
                            <Slider
                                min={1}
                                max={this.props.productData.amount}
                                orientation={`horizontal`}
                                value={this.state.amountValue}
                                tooltip={false}
                                step={1}
                                onChange={this.handleSliderChange}
                                onChangeComplete={this.handleSliderChangeComplete}
                            />
                        </div><hr />
                        <button type="button" className="btn btn-default pull-left" onClick={this.handleClose}><FontAwesome name="window-close" /> Close</button>
                        <button type="button" className="btn btn-primary pull-right" onClick={() => {
                            this.props.addProduct({
                                id: this.props.productData.id,
                                amount: this.state.amountValue,
                                name: this.props.productData.name,
                                price: this.props.productData.price,
                                detail: this.props.productData.detail,
                                editDate: this.props.productData.editDate,
                                saleDate: this.props.productData.saleDate,
                                owner: this.props.productData.owner
                            })
                            this.handleClose()
                        }}><FontAwesome name="cart-arrow-down" /> เพิ่มลงตระกร้า</button>
                    </ModalDialog>
                </ModalContainer>
            }
        </div>;
    }
}

export default ProductDetail;