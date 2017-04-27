import React from 'react';
import UpperHeaderSection from './UpperHeaderSection';
import SlideShow from './SlideShow';
import ProductReview from './ProductReview';
import FooterSection from './FooterSection';
import { sliderTimer } from './slidertimer';

function MainPage() {
  return (
    <div className="container-pager" onLoad={sliderTimer}>
      <UpperHeaderSection user={this.props.user} />
      <SlideShow />
      <ProductReview addProduct={this.props.addProduct} />
      <FooterSection />
    </div>
  );
}
export default MainPage;
