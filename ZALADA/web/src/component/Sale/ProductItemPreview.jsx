import React from 'react'

class ProductItemPreview extends React.Component {

	render() {
		return (
            <div className="col-sm-3 product-item-preview">
                <div className="col-item">
                <div className="photo">
                    <img src={`http://localhost:9001/product/image/${this.props.id}`} className="img-responsive" alt={`${this.props.name}`} />
                </div>
                <div className="info">
                    <div className="row">
                        <div className="price col-md-6">
                            <h5>{this.props.name}</h5>
                            <h5 className="price-text-color">ราคา {this.props.price} ฿</h5>
                        </div>
                        <div className="rating hidden-sm col-md-6">
                            <i className="price-text-color fa fa-star"></i><i className="price-text-color fa fa-star">
                            </i><i className="price-text-color fa fa-star"></i><i className="price-text-color fa fa-star">
                            </i><i className="fa fa-star"></i>
                        </div>
                    </div>
                    <div className="separator clear-left">
                        <p className="btn-add"><i className="fa fa-shopping-cart"></i><a href="#" className="hidden-sm">Add to cart</a></p>
                         <p className="btn-details"><i className="fa fa-list"></i><a href="#" className="hidden-sm">More details</a></p>
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