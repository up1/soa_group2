/* eslint-disable */
var imgadr = ['http://1d5unn3435vt5h99p1qrei61.wpengine.netdna-cdn.com/wp-content/uploads/2015/03/loptimum-tuxedo11.jpg',
  'http://lochmondlink.com/wp-content/uploads/2016/03/main-banner1-1440x550.jpg', 'https://s-media-cache-ak0.pinimg.com/originals/75/7a/7d/757a7d6f70ef0407d65df17aa189a0a7.jpg',
  'https://c.s-microsoft.com/th-th/CMSImages/O16_OfficeH-S_1920x660.jpg?version=2156ab07-74a6-781f-0e39-2439bb323993'];
var headArray = ['สินค้าสุภาพบุรุษ', 'สินค้าแฟชั่น', 'สินค้าวัยรุ่น', 'สินค้าไอที'];
var paraArray = ['มีสินค้าให้คุณสุภาพบุรุษได้ช๊อปด้วยกันหลากหลายแบบ !',
  'แฟชั่นที่กำลังเป็นเทรนใหม่มาแรงสุดสวยไม่แพ้ใคร !',
  'สินค้าวัยรุ่น เท่ สวยได้ดั่งใจวัยใสจัดเลยมัวรออะไรอยู่ !',
  'เครื่องใช้ไฟฟ้า สินค้าไอที อุปกรณ์อิเล็กโทรนิคมีให้เลือกสันมากมาย'];
var cnt = 0;
var timer;
export function sliderTimer() {
    timer = setInterval(slider, 3500);
  }

function slider() {
    cnt++;
    if (cnt == imgadr.length)
      cnt = 0;

    var slider = document.getElementById('slider');
    slider.style.backgroundImage = "url(\'" + imgadr[cnt] + "\')";
    document.getElementById('sliderHeader').innerHTML = headArray[cnt];  
    document.getElementById('sliderPara').innerHTML = paraArray[cnt];
  }

export function next() {
    clearInterval(timer);

    cnt++;
    if (cnt == imgadr.length)
      cnt = 0;

    var slider = document.getElementById('slider');
    slider.style.backgroundImage = "url(\'" + imgadr[cnt] + "\')";
    document.getElementById('sliderHeader').innerHTML = headArray[cnt];
    document.getElementById('sliderPara').innerHTML = paraArray[cnt];

    sliderTimer();
  }

export function prev() {
    console.log('prev');
    clearInterval(timer);

    cnt--;
    if (cnt == -1)
      cnt = imgadr.length - 1;

    var slider = document.getElementById('slider');
    slider.style.backgroundImage = "url(\'" + imgadr[cnt] + "\')";
    document.getElementById('sliderHeader').innerHTML = headArray[cnt];
    document.getElementById('sliderPara').innerHTML = paraArray[cnt];

    sliderTimer();
  }