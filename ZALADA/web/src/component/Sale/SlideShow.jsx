import React from 'react';
import Slider from 'react-slick';
// import {prev,next} from './slidertimer.js';
import './css/slideshow.css';

class SlideShow extends React.Component {

  render() {
    const images = [
      'http://1d5unn3435vt5h99p1qrei61.wpengine.netdna-cdn.com/wp-content/uploads/2015/03/loptimum-tuxedo11.jpg',
      'http://lochmondlink.com/wp-content/uploads/2016/03/main-banner1-1440x550.jpg',
      'https://s-media-cache-ak0.pinimg.com/originals/75/7a/7d/757a7d6f70ef0407d65df17aa189a0a7.jpg',
      'https://c.s-microsoft.com/th-th/CMSImages/O16_OfficeH-S_1920x660.jpg?version=2156ab07-74a6-781f-0e39-2439bb323993'
    ];
    return (
      <Slider images={images} isInfinite delay={3500} autoplay={true} dots={true} pauseOnHover={false}>
        {images.map((image, key) => <div key={key}><img alt="slide-imgs" src={image} className="imageSlide" /></div>)}
      </Slider>
    );
    /*return (
      <div id="slider">
        <div className="icon" id="left"><i classNameName="fa fa-angle-left" onClick={prev}></i></div>
        <h2 id="sliderHeader">สินค้าสุภาพบุรุษ</h2>
        <p id="sliderPara">มีสินค้าให้คุณสุภาพบุรุษได้ช๊อปด้วยกันหลากหลายแบบ !</p>
        <div className="icon" id="right"><i classNameName="fa fa-angle-right" onClick={next}></i></div>
      </div>
    )*/
  }
}
export default SlideShow;