import React from 'react';
import {prev,next} from './slidertimer.js';
import './css/slideshow.css';

class SlideShow extends React.Component {

  render() {
    return (
      <div id="slider">
        <div className="icon" id="left"><i className="fa fa-angle-left" onClick={prev}></i></div>
        <h2 id="sliderHeader">สินค้าสุภาพบุรุษ</h2>
        <p id="sliderPara">มีสินค้าให้คุณสุภาพบุรุษได้ช๊อปด้วยกันหลากหลายแบบ !</p>
        <div className="icon" id="right"><i className="fa fa-angle-right" onClick={next}></i></div>
      </div>
    )
  }
}
export default SlideShow;