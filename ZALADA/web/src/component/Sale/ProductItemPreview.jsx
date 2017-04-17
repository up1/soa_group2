import React from 'react'
import ProductDetail from './ProductDetail.jsx'

class ProductItemPreview extends React.Component {
    
	render() {
        const dialog = <ProductDetail productData={this.props} addProduct={this.props.addProduct} />
		return (
            <div className={`col-sm-${this.props.width} product-item-preview`}>
                <div className="col-item">
                <div className="photo">
                    <img src={`http://localhost:9001/product/image/${this.props.id}`} className="img-responsive" alt={`${this.props.name}`} />
                </div>
                <div className="info">
                    <div className="row">
                        <div className="price col-md-12">
                            <h5>{this.props.name}</h5>
                            <h5 className="price-text-color">ราคา {this.props.price} ฿</h5>
                        </div>
                        <div className="rating hidden-sm col-md-12 pull-left">
                            <i className="price-text-color fa fa-star"></i><i className="price-text-color fa fa-star">
                            </i><i className="price-text-color fa fa-star"></i><i className="price-text-color fa fa-star"></i>
                        </div>
                    </div>
                    <div className="separator clear-left">
                        <p className="btn-add" onClick={ () => {this.props.addProduct({
                            id : this.props.id,
                            amount : 1,
                            name : this.props.name,
                            price : this.props.price,
                            detail : this.props.detail,
                            editDate : this.props.editDate,
                            saleDate : this.props.saleDate,
                            owner : this.props.owner
                            }) } }><i className="fa fa-shopping-cart"></i><br/><a href="#" className="hidden-sm">Add to cart</a></p>
                         <p className="btn-details"><i className="fa fa-list"></i><br/><button type="button" className="btn btn-link">{dialog}</button></p>
                    </div>
                    <div className="clearfix"></div>
                    </div>
                </div>
            </div>
            )
	}

}

ProductItemPreview.contextTypes = {
    router: React.PropTypes.object
}

export default ProductItemPreview