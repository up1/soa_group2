import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import './css/productReview.css';
import ProductItemPreview from './ProductItemPreview'; // each product item component
import { SaleService } from '../../util/AxiosWrapper';

class ProductReview extends React.Component {

  constructor() {
    super();
    this.state = {
      cartItemCount: 0,
      products: [],
    };
    this.loadAllProduct = this
      .loadAllProduct
      .bind(this);
    this.loadAllProduct();
  }

  loadAllProduct() {
    SaleService
      .get('/sale')
      .then((response) => {
        const productList = response
          .data
          .map((product, index) => <ProductItemPreview
            width={3}
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
            addProduct={this.props.addProduct}
          />);

        this.setState({ products: productList });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    };
    return (
      <div className="container" id="pd-review-container">
        <div className="row">
          <div className="row" id="header-row-list">
            <div className="col-md-12">
              <h3>
                รายการสินค้าแนะนำ / ขายดี</h3>
            </div>
          </div>
          <div
            id="carousel-example"
            className="carousel slide hidden-xs"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="item active">
                <div className="row">
                  {this.state.products}
                  {/* <Slider {...settings}>{this.state.products}</Slider> */}
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
                <a
                  className="left fa fa-chevron-left btn btn-primary"
                  href="#carousel-example-generic"
                  data-slide="prev"
                ></a>
                <a
                  className="right fa fa-chevron-right btn btn-primary"
                  href="#carousel-example-generic"
                  data-slide="next"
                ></a>
              </div>
            </div>
          </div>
          <div
            id="carousel-example-generic"
            className="carousel slide hidden-xs"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="item active">
                <div className="row">
                  <div className="col-sm-4">
                    <div className="col-item">
                      <div className="photo">
                        <img
                          src="http://www.realmenrealstyle.com/wp-content/uploads/JL-Rocha-chelsea-boots-black.jpg"
                          className="img-responsive"
                          alt="a"
                        />
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
                            <i className="price-text-color fa fa-star" />
                            <i className="price-text-color fa fa-star" />
                            <i className="price-text-color fa fa-star" />
                            <i className="price-text-color fa fa-star" />
                            <i className="fa fa-star" />
                          </div>
                        </div>
                        <div className="separator clear-left">
                          <p className="btn-add">
                            <i className="fa fa-shopping-cart" />
                            <a className="hidden-sm">Add to cart</a>
                          </p>
                          <p className="btn-details">
                            <i className="fa fa-list" />
                            <a className="hidden-sm">More details</a>
                          </p>
                        </div>
                        <div className="clearfix" />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="col-item">
                      <div className="photo">
                        <img
                          src="https://leesdragondreams.com.au/wp-content/uploads/2015/12/JD-DR-8243b-wall-350x260.jpg"
                          className="img-responsive"
                          alt="a"
                        />
                      </div>
                      <div className="info">
                        <div className="row">
                          <div className="price col-md-6">
                            <h5>
                              Product Example</h5>
                            <h5 className="price-text-color">
                              $249.99</h5>
                          </div>
                          <div className="rating hidden-sm col-md-6" />
                        </div>
                        <div className="separator clear-left">
                          <p className="btn-add">
                            <i className="fa fa-shopping-cart" />
                            <a href="#" className="hidden-sm">Add to cart</a>
                          </p>
                          <p className="btn-details">
                            <i className="fa fa-list" />
                            <a href="#" className="hidden-sm">More details</a>
                          </p>
                        </div>
                        <div className="clearfix" />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="col-item">
                      <div className="photo">
                        <img
                          src="https://fitinline.com/data/article/20130926/zipper%20dress%204.jpg"
                          className="img-responsive"
                          alt="a"
                        />
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
                            <i className="price-text-color fa fa-star" />
                            <i className="price-text-color fa fa-star" />
                            <i className="price-text-color fa fa-star" />
                            <i className="price-text-color fa fa-star" />
                            <i className="fa fa-star" />
                          </div>
                        </div>
                        <div className="separator clear-left">
                          <p className="btn-add">
                            <i className="fa fa-shopping-cart" />
                            <a href="#" className="hidden-sm">Add to cart</a>
                          </p>
                          <p className="btn-details">
                            <i className="fa fa-list" />
                            <a href="#" className="hidden-sm">More details</a>
                          </p>
                        </div>
                        <div className="clearfix" />
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
                        <img
                          src="http://animalcrueltyfreeproducts.com/wp-content/uploads/2014/08/51ThGkhSxZL-350x260.jpg"
                          className="img-responsive"
                          alt="a"
                        />
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
                            <i className="price-text-color fa fa-star" />
                            <i className="price-text-color fa fa-star" />
                            <i className="price-text-color fa fa-star" />
                            <i className="price-text-color fa fa-star" />
                            <i className="fa fa-star" />
                          </div>
                        </div>
                        <div className="separator clear-left">
                          <p className="btn-add">
                            <i className="fa fa-shopping-cart" />
                            <a href="#" className="hidden-sm">Add to cart</a>
                          </p>
                          <p className="btn-details">
                            <i className="fa fa-list" />
                            <a href="#" className="hidden-sm">More details</a>
                          </p>
                        </div>
                        <div className="clearfix" />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="col-item">
                      <div className="photo">
                        <img
                          src="http://cdn.head-fi.org/f/fb/350x700px-LL-fb51fadc_GBA-400-4AJF.jpeg"
                          className="img-responsive"
                          alt="a"
                        />
                      </div>
                      <div className="info">
                        <div className="row">
                          <div className="price col-md-6">
                            <h5>
                              Grouped Product</h5>
                            <h5 className="price-text-color">
                              $249.99</h5>
                          </div>
                          <div className="rating hidden-sm col-md-6" />
                        </div>
                        <div className="separator clear-left">
                          <p className="btn-add">
                            <i className="fa fa-shopping-cart" />
                            <a href="#" className="hidden-sm">Add to cart</a>
                          </p>
                          <p className="btn-details">
                            <i className="fa fa-list" />
                            <a href="#" className="hidden-sm">More details</a>
                          </p>
                        </div>
                        <div className="clearfix" />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="col-item">
                      <div className="photo">
                        <img
                          src="http://www.notebooksrus.net.au/wordpress/wp-content/uploads/2014/09/hp-450-g2-j8k44pa.jpg"
                          className="img-responsive"
                          alt="a"
                        />
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
                            <i className="price-text-color fa fa-star" />
                            <i className="price-text-color fa fa-star" />
                            <i className="price-text-color fa fa-star" />
                            <i className="price-text-color fa fa-star" />
                            <i className="fa fa-star" />
                          </div>
                        </div>
                        <div className="separator clear-left">
                          <p className="btn-add">
                            <i className="fa fa-shopping-cart" />
                            <a href="#" className="hidden-sm">Add to cart</a>
                          </p>
                          <p className="btn-details">
                            <i className="fa fa-list" />
                            <a href="#" className="hidden-sm">More details</a>
                          </p>
                        </div>
                        <div className="clearfix" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

ProductReview.propTypes = {
  addProduct: PropTypes.func.isRequired,
};

export default ProductReview;
