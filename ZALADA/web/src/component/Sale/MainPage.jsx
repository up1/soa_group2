import React from 'react';
import PropTypes from 'prop-types';
import UpperHeaderSection from './UpperHeaderSection';
import SlideShow from './SlideShow';
import ProductReview from './ProductReview';
import FooterSection from './FooterSection';
import { sliderTimer } from './slidertimer';

function MainPage(props) {
  return (
    <div className="container-pager" onLoad={sliderTimer}>
      <UpperHeaderSection user={props.user} userLogout={props.userLogout} />
      <SlideShow />
      <ProductReview addProduct={props.addProduct} />
      <FooterSection />
    </div>
  );
}

MainPage.defaultProps = {
  user: '',
};

MainPage.propTypes = {
  addProduct: PropTypes.func.isRequired,
  user: PropTypes.string,
};

export default MainPage;
