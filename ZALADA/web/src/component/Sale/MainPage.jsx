import React from 'react';
import UpperHeaderSection from './UpperHeaderSection.jsx';
import SlideShow from './SlideShow.jsx';
import ProductReview from './ProductReview.jsx';
import FooterSection from './FooterSection.jsx';
import { sliderTimer } from './slidertimer.js';

class MainPage extends React.Component {

  render() {
    return (
      <div className="container-pager" onLoad={sliderTimer}>
        <UpperHeaderSection user={this.props.user} />
        <SlideShow />
        <ProductReview addProduct={this.props.addProduct} />
        <FooterSection />
      </div>
    );
  }
}

export default MainPage;
