const React = require('react');
import UpperHeaderSection from './UpperHeaderSection.jsx';
import SlideShow from './SlideShow.jsx';
import ProductReview from './ProductReview.jsx';
import FooterSection from './FooterSection.jsx';
import {sliderTimer} from '../slidertimer.js';

class App extends React.Component {

  render() {
    return (
      <div className="container-pager" onLoad={sliderTimer}>
        <UpperHeaderSection />
        <SlideShow />
        <ProductReview />
        <FooterSection/>
      </div>
    )
  }
}

export default App;