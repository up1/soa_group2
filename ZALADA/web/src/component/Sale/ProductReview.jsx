import React from 'react';
import './css/productReview.css';

class ProductReview extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="row" id="header-row-list">
                        <div className="col-md-9">
                            <h3>
                                รายการสินค้าแนะนำ / ขายดี</h3>
                        </div>
                        <div className="col-md-3">
                            <div className="controls pull-right hidden-xs">
                                <a className="left fa fa-chevron-left btn btn-success" href="#carousel-example"
                                    data-slide="prev"></a><a className="right fa fa-chevron-right btn btn-success" href="#carousel-example"
                                        data-slide="next"></a>
                            </div>
                        </div>
                    </div>
                    <div id="carousel-example" className="carousel slide hidden-xs" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="item active">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="col-item">
                                            <div className="photo">
                                                <img src="https://www.unloathe.com/product_photos/3337227540886.jpg" className="img-responsive" alt="a" />
                                            </div>
                                            <div className="info">
                                                <div className="row">
                                                    <div className="price col-md-6">
                                                        <h5>
                                                            Sample Product</h5>
                                                        <h5 className="price-text-color">
                                                            $199.99</h5>
                                                    </div>
                                                    <div className="rating hidden-sm col-md-6">
                                                        <i className="price-text-color fa fa-star"></i><i className="price-text-color fa fa-star">
                                                        </i><i className="price-text-color fa fa-star"></i><i className="price-text-color fa fa-star">
                                                        </i><i className="fa fa-star"></i>
                                                    </div>
                                                </div>
                                                <div className="separator clear-left">
                                                    <p className="btn-add">
                                                        <i className="fa fa-shopping-cart"></i><a href="http://www.jquery2dotnet.com" className="hidden-sm">Add to cart</a></p>
                                                    <p className="btn-details">
                                                        <i className="fa fa-list"></i><a href="http://www.jquery2dotnet.com" className="hidden-sm">More details</a></p>
                                                </div>
                                                <div className="clearfix">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-item">
                                            <div className="photo">
                                                <img src="https://sc01.alicdn.com/kf/HTB133JzKFXXXXXdXpXXq6xXFXXXp/fancy-gift-items.jpg_350x350.jpg" className="img-responsive" alt="a" />
                                            </div>
                                            <div className="info">
                                                <div className="row">
                                                    <div className="price col-md-6">
                                                        <h5>
                                                            Product Example</h5>
                                                        <h5 className="price-text-color">
                                                            $249.99</h5>
                                                    </div>
                                                    <div className="rating hidden-sm col-md-6">
                                                    </div>
                                                </div>
                                                <div className="separator clear-left">
                                                    <p className="btn-add">
                                                        <i className="fa fa-shopping-cart"></i><a href="http://www.jquery2dotnet.com" className="hidden-sm">Add to cart</a></p>
                                                    <p className="btn-details">
                                                        <i className="fa fa-list"></i><a href="http://www.jquery2dotnet.com" className="hidden-sm">More details</a></p>
                                                </div>
                                                <div className="clearfix">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-item">
                                            <div className="photo">
                                                <img src="http://www.reliance.com.tw/comm/upfile/p_130306_09572.jpg" className="img-responsive" alt="a" />
                                            </div>
                                            <div className="info">
                                                <div className="row">
                                                    <div className="price col-md-6">
                                                        <h5>
                                                            Next Sample Product</h5>
                                                        <h5 className="price-text-color">
                                                            $149.99</h5>
                                                    </div>
                                                    <div className="rating hidden-sm col-md-6">
                                                        <i className="price-text-color fa fa-star"></i><i className="price-text-color fa fa-star">
                                                        </i><i className="price-text-color fa fa-star"></i><i className="price-text-color fa fa-star">
                                                        </i><i className="fa fa-star"></i>
                                                    </div>
                                                </div>
                                                <div className="separator clear-left">
                                                    <p className="btn-add">
                                                        <i className="fa fa-shopping-cart"></i><a href="http://www.jquery2dotnet.com" className="hidden-sm">Add to cart</a></p>
                                                    <p className="btn-details">
                                                        <i className="fa fa-list"></i><a href="http://www.jquery2dotnet.com" className="hidden-sm">More details</a></p>
                                                </div>
                                                <div className="clearfix">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-item">
                                            <div className="photo">
                                                <img src="https://guide.alibaba.com/image/i1/nikon-nikon-binoculars-read-wild-sx-cf-7x50-hd-high-power-fog-shockproof-waterproof/TB1Ni56GXXXXXXraXXXXXXXXXXX_!!2-item_pic.png" 
                                                className="img-responsive" alt="a" />
                                            </div>
                                            <div className="info">
                                                <div className="row">
                                                    <div className="price col-md-6">
                                                        <h5>
                                                            Sample Product</h5>
                                                        <h5 className="price-text-color">
                                                            $199.99</h5>
                                                    </div>
                                                    <div className="rating hidden-sm col-md-6">
                                                        <i className="price-text-color fa fa-star"></i><i className="price-text-color fa fa-star">
                                                        </i><i className="price-text-color fa fa-star"></i><i className="price-text-color fa fa-star">
                                                        </i><i className="fa fa-star"></i>
                                                    </div>
                                                </div>
                                                <div className="separator clear-left">
                                                    <p className="btn-add">
                                                        <i className="fa fa-shopping-cart"></i><a href="http://www.jquery2dotnet.com" className="hidden-sm">Add to cart</a></p>
                                                    <p className="btn-details">
                                                        <i className="fa fa-list"></i><a href="http://www.jquery2dotnet.com" className="hidden-sm">More details</a></p>
                                                </div>
                                                <div className="clearfix">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="col-item">
                                            <div className="photo">
                                                <img src="http://took-dfurniture.com/images/office/2.jpg" className="img-responsive" alt="a" />
                                            </div>
                                            <div className="info">
                                                <div className="row">
                                                    <div className="price col-md-6">
                                                        <h5>
                                                            Product with Variants</h5>
                                                        <h5 className="price-text-color">
                                                            $199.99</h5>
                                                    </div>
                                                    <div className="rating hidden-sm col-md-6">
                                                        <i className="price-text-color fa fa-star"></i><i className="price-text-color fa fa-star">
                                                        </i><i className="price-text-color fa fa-star"></i><i className="price-text-color fa fa-star">
                                                        </i><i className="fa fa-star"></i>
                                                    </div>
                                                </div>
                                                <div className="separator clear-left">
                                                    <p className="btn-add">
                                                        <i className="fa fa-shopping-cart"></i><a href="http://www.jquery2dotnet.com" className="hidden-sm">Add to cart</a></p>
                                                    <p className="btn-details">
                                                        <i className="fa fa-list"></i><a href="http://www.jquery2dotnet.com" className="hidden-sm">More details</a></p>
                                                </div>
                                                <div className="clearfix">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-item">
                                            <div className="photo">
                                                <img src="https://sc01.alicdn.com/kf/HTB1DapVJFXXXXcgXpXXq6xXFXXXZ/Supports-custom-and-wholesale-cheap-fashion-crocodile.jpg_350x350.jpg" 
                                                className="img-responsive" alt="a" />
                                            </div>
                                            <div className="info">
                                                <div className="row">
                                                    <div className="price col-md-6">
                                                        <h5>
                                                            Grouped Product</h5>
                                                        <h5 className="price-text-color">
                                                            $249.99</h5>
                                                    </div>
                                                    <div className="rating hidden-sm col-md-6">
                                                    </div>
                                                </div>
                                                <div className="separator clear-left">
                                                    <p className="btn-add">
                                                        <i className="fa fa-shopping-cart"></i><a href="http://www.jquery2dotnet.com" className="hidden-sm">Add to cart</a></p>
                                                    <p className="btn-details">
                                                        <i className="fa fa-list"></i><a href="http://www.jquery2dotnet.com" className="hidden-sm">More details</a></p>
                                                </div>
                                                <div className="clearfix">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-item">
                                            <div className="photo">
                                                <img src="https://images.milled.com/2015-01-11/ufaifyp6RLMRHUHg/M7i8WNIvbBdW.jpg" className="img-responsive" alt="a" />
                                            </div>
                                            <div className="info">
                                                <div className="row">
                                                    <div className="price col-md-6">
                                                        <h5>
                                                            Product with Variants</h5>
                                                        <h5 className="price-text-color">
                                                            $149.99</h5>
                                                    </div>
                                                    <div className="rating hidden-sm col-md-6">
                                                        <i className="price-text-color fa fa-star"></i><i className="price-text-color fa fa-star">
                                                        </i><i className="price-text-color fa fa-star"></i><i className="price-text-color fa fa-star">
                                                        </i><i className="fa fa-star"></i>
                                                    </div>
                                                </div>
                                                <div className="separator clear-left">
                                                    <p className="btn-add">
                                                        <i className="fa fa-shopping-cart"></i><a href="http://www.jquery2dotnet.com" className="hidden-sm">Add to cart</a></p>
                                                    <p className="btn-details">
                                                        <i className="fa fa-list"></i><a href="http://www.jquery2dotnet.com" className="hidden-sm">More details</a></p>
                                                </div>
                                                <div className="clearfix">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-item">
                                            <div className="photo">
                                                <img src="http://d13z1xw8270sfc.cloudfront.net/resize/201023/1439340223698__572.jpg/260/350/0/" className="img-responsive" alt="a" />
                                            </div>
                                            <div className="info">
                                                <div className="row">
                                                    <div className="price col-md-6">
                                                        <h5>
                                                            Product with Variants</h5>
                                                        <h5 className="price-text-color">
                                                            $199.99</h5>
                                                    </div>
                                                    <div className="rating hidden-sm col-md-6">
                                                        <i className="price-text-color fa fa-star"></i><i className="price-text-color fa fa-star">
                                                        </i><i className="price-text-color fa fa-star"></i><i className="price-text-color fa fa-star">
                                                        </i><i className="fa fa-star"></i>
                                                    </div>
                                                </div>
                                                <div className="separator clear-left">
                                                    <p className="btn-add">
                                                        <i className="fa fa-shopping-cart"></i><a href="http://www.jquery2dotnet.com" className="hidden-sm">Add to cart</a></p>
                                                    <p className="btn-details">
                                                        <i className="fa fa-list"></i><a href="http://www.jquery2dotnet.com" className="hidden-sm">More details</a></p>
                                                </div>
                                                <div className="clearfix">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="row">
                        <div className="col-md-9">
                            <h3>
                                รายการสินค้าโปรโมชั่น</h3>
                        </div>
                        <div className="col-md-3">
                            <div className="controls pull-right hidden-xs">
                                <a className="left fa fa-chevron-left btn btn-primary" href="#carousel-example-generic"
                                    data-slide="prev"></a><a className="right fa fa-chevron-right btn btn-primary" href="#carousel-example-generic"
                                        data-slide="next"></a>
                            </div>
                        </div>
                    </div>
                    <div id="carousel-example-generic" className="carousel slide hidden-xs" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="item active">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="col-item">
                                            <div className="photo">
                                                <img src="http://www.realmenrealstyle.com/wp-content/uploads/JL-Rocha-chelsea-boots-black.jpg" className="img-responsive" alt="a" />
                                            </div>
                                            <div className="info">
                                                <div className="row">
                                                    <div className="price col-md-6">
                                                        <h5>
                                                            Sample Product</h5>
                                                        <h5 className="price-text-color">
                                                            $199.99</h5>
                                                    </div>
                                                    <div className="rating hidden-sm col-md-6">
                                                        <i className="price-text-color fa fa-star"></i><i className="price-text-color fa fa-star">
                                                        </i><i className="price-text-color fa fa-star"></i><i className="price-text-color fa fa-star">
                                                        </i><i className="fa fa-star"></i>
                                                    </div>
                                                </div>
                                                <div className="separator clear-left">
                                                    <p className="btn-add">
                                                        <i className="fa fa-shopping-cart"></i><a href="http://www.jquery2dotnet.com" className="hidden-sm">Add to cart</a></p>
                                                    <p className="btn-details">
                                                        <i className="fa fa-list"></i><a href="http://www.jquery2dotnet.com" className="hidden-sm">More details</a></p>
                                                </div>
                                                <div className="clearfix">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="col-item">
                                            <div className="photo">
                                                <img src="https://leesdragondreams.com.au/wp-content/uploads/2015/12/JD-DR-8243b-wall-350x260.jpg" className="img-responsive" alt="a" />
                                            </div>
                                            <div className="info">
                                                <div className="row">
                                                    <div className="price col-md-6">
                                                        <h5>
                                                            Product Example</h5>
                                                        <h5 className="price-text-color">
                                                            $249.99</h5>
                                                    </div>
                                                    <div className="rating hidden-sm col-md-6">
                                                    </div>
                                                </div>
                                                <div className="separator clear-left">
                                                    <p className="btn-add">
                                                        <i className="fa fa-shopping-cart"></i><a href="http://www.jquery2dotnet.com" className="hidden-sm">Add to cart</a></p>
                                                    <p className="btn-details">
                                                        <i className="fa fa-list"></i><a href="http://www.jquery2dotnet.com" className="hidden-sm">More details</a></p>
                                                </div>
                                                <div className="clearfix">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="col-item">
                                            <div className="photo">
                                                <img src="https://fitinline.com/data/article/20130926/zipper%20dress%204.jpg" className="img-responsive" alt="a" />
                                            </div>
                                            <div className="info">
                                                <div className="row">
                                                    <div className="price col-md-6">
                                                        <h5>
                                                            Next Sample Product</h5>
                                                        <h5 className="price-text-color">
                                                            $149.99</h5>
                                                    </div>
                                                    <div className="rating hidden-sm col-md-6">
                                                        <i className="price-text-color fa fa-star"></i><i className="price-text-color fa fa-star">
                                                        </i><i className="price-text-color fa fa-star"></i><i className="price-text-color fa fa-star">
                                                        </i><i className="fa fa-star"></i>
                                                    </div>
                                                </div>
                                                <div className="separator clear-left">
                                                    <p className="btn-add">
                                                        <i className="fa fa-shopping-cart"></i><a href="http://www.jquery2dotnet.com" className="hidden-sm">Add to cart</a></p>
                                                    <p className="btn-details">
                                                        <i className="fa fa-list"></i><a href="http://www.jquery2dotnet.com" className="hidden-sm">More details</a></p>
                                                </div>
                                                <div className="clearfix">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="col-item">
                                            <div className="photo">
                                                <img src="http://animalcrueltyfreeproducts.com/wp-content/uploads/2014/08/51ThGkhSxZL-350x260.jpg" className="img-responsive" alt="a" />
                                            </div>
                                            <div className="info">
                                                <div className="row">
                                                    <div className="price col-md-6">
                                                        <h5>
                                                            Product with Variants</h5>
                                                        <h5 className="price-text-color">
                                                            $199.99</h5>
                                                    </div>
                                                    <div className="rating hidden-sm col-md-6">
                                                        <i className="price-text-color fa fa-star"></i><i className="price-text-color fa fa-star">
                                                        </i><i className="price-text-color fa fa-star"></i><i className="price-text-color fa fa-star">
                                                        </i><i className="fa fa-star"></i>
                                                    </div>
                                                </div>
                                                <div className="separator clear-left">
                                                    <p className="btn-add">
                                                        <i className="fa fa-shopping-cart"></i><a href="http://www.jquery2dotnet.com" className="hidden-sm">Add to cart</a></p>
                                                    <p className="btn-details">
                                                        <i className="fa fa-list"></i><a href="http://www.jquery2dotnet.com" className="hidden-sm">More details</a></p>
                                                </div>
                                                <div className="clearfix">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="col-item">
                                            <div className="photo">
                                                <img src="http://cdn.head-fi.org/f/fb/350x700px-LL-fb51fadc_GBA-400-4AJF.jpeg" className="img-responsive" alt="a" />
                                            </div>
                                            <div className="info">
                                                <div className="row">
                                                    <div className="price col-md-6">
                                                        <h5>
                                                            Grouped Product</h5>
                                                        <h5 className="price-text-color">
                                                            $249.99</h5>
                                                    </div>
                                                    <div className="rating hidden-sm col-md-6">
                                                    </div>
                                                </div>
                                                <div className="separator clear-left">
                                                    <p className="btn-add">
                                                        <i className="fa fa-shopping-cart"></i><a href="http://www.jquery2dotnet.com" className="hidden-sm">Add to cart</a></p>
                                                    <p className="btn-details">
                                                        <i className="fa fa-list"></i><a href="http://www.jquery2dotnet.com" className="hidden-sm">More details</a></p>
                                                </div>
                                                <div className="clearfix">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="col-item">
                                            <div className="photo">
                                                <img src="http://www.notebooksrus.net.au/wordpress/wp-content/uploads/2014/09/hp-450-g2-j8k44pa.jpg" className="img-responsive" alt="a" />
                                            </div>
                                            <div className="info">
                                                <div className="row">
                                                    <div className="price col-md-6">
                                                        <h5>
                                                            Product with Variants</h5>
                                                        <h5 className="price-text-color">
                                                            $149.99</h5>
                                                    </div>
                                                    <div className="rating hidden-sm col-md-6">
                                                        <i className="price-text-color fa fa-star"></i><i className="price-text-color fa fa-star">
                                                        </i><i className="price-text-color fa fa-star"></i><i className="price-text-color fa fa-star">
                                                        </i><i className="fa fa-star"></i>
                                                    </div>
                                                </div>
                                                <div className="separator clear-left">
                                                    <p className="btn-add">
                                                        <i className="fa fa-shopping-cart"></i><a href="http://www.jquery2dotnet.com" className="hidden-sm">Add to cart</a></p>
                                                    <p className="btn-details">
                                                        <i className="fa fa-list"></i><a href="http://www.jquery2dotnet.com" className="hidden-sm">More details</a></p>
                                                </div>
                                                <div className="clearfix">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default ProductReview;