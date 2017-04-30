import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import Navbar from '../UpperHeaderSection';
import Footer from '../FooterSection';
import '../css/category.css';

class CategoryPage extends React.Component {

  render() {
    return (
      <div id="category-page">
        <Navbar />
        <div className="container-fluid category-body">
          <h1>
            <FontAwesome name="tags" />
            เลือกสินค้าตามประเภท
          </h1>
          <div className="col-md-4">
            <h4 className="category-name"><FontAwesome name="venus" />
              | แฟชั่นสุภาพสตรี</h4>
            <ul className="sub-category-list">
              <li>
                <Link to="/category/Men Clothing">เสื้อผ้า</Link>
              </li>
              <li>
                <Link to="/category/Men Shoes">รองเท้า</Link>
              </li>
              <li>
                <Link to="/category/Men Bags">กระเป๋า</Link>
              </li>
              <li>
                <Link to="/category/Men Watches">นาฬิกา</Link>
              </li>
              <li>
                <Link to="/category/Men Eyewear">แว่นตา</Link>
              </li>
              <li>
                <Link to="/category/Men Jewellery">เครื่องประดับ</Link>
              </li>
            </ul>
            <h4 className="category-name"><FontAwesome name="mars" />
              | แฟชั่นสุภาพบุรุษ</h4>
            <ul className="sub-category-list">
              <li>
                <Link to="/category/Women Clothing">เสื้อผ้า</Link>
              </li>
              <li>
                <Link to="/category/Women Shoes">รองเท้า</Link>
              </li>
              <li>
                <Link to="/category/Women Bags">กระเป๋า</Link>
              </li>
              <li>
                <Link to="/category/Women Watches">นาฬิกา</Link>
              </li>
              <li>
                <Link to="/category/Women Eyewear">แว่นตา</Link>
              </li>
              <li>
                <Link to="/category/Women Jewellery">เครื่องประดับ</Link>
              </li>
            </ul>
            <h4 className="category-name"><FontAwesome name="medkit" />
              | สุขภาพและความงาม</h4>
            <ul className="sub-category-list">
              <li>
                <Link to="/category/Skin Care">ผลิตภัณฑ์ดูแลผิวหน้า</Link>
              </li>
              <li>
                <Link to="/category/Makeup">เครื่องสำอาง</Link>
              </li>
              <li>
                <Link to="/category/Beauty Tools">อุปกรณ์เสริมความงาม</Link>
              </li>
              <li>
                <Link to="/category/Fragrances">น้ำหอม</Link>
              </li>
              <li>
                <Link to="/category/Food Supplement">อาหารเสริม</Link>
              </li>
              <li>
                <Link to="/category/Men's Care">ผลิตภัณฑ์สำหรับผู้ชาย</Link>
              </li>
            </ul>
            <h4 className="category-name"><FontAwesome name="tag" />
              | สินค้าอุปโภคบริโภค</h4>
            <ul className="sub-category-list">
              <li>
                <Link to="/category/Breakfast">อาหารเช้า</Link>
              </li>
              <li>
                <Link to="/category/Beverages">อาหารและเครื่องดื่ม</Link>
              </li>
              <li>
                <Link to="/category/Candy and Chocolate">ลูกอมและขนม</Link>
              </li>
              <li>
                <Link to="/category/Canned and Instant Foods">อาหารกระป๋องและอาหารสำเร็จรูป</Link>
              </li>
              <li>
                <Link to="/category/Laundry">น้ำยาซักผ้า</Link>
              </li>
              <li>
                <Link to="/category/Baking Cooking">วัตถุดิบเบเกอรี่</Link>
              </li>
            </ul>
            <h4 className="category-name"><FontAwesome name="gamepad" />
              | เกม & ของเล่น</h4>
            <ul className="sub-category-list">
              <li>
                <Link to="/category/Learning and Education">ของเล่นเสริมทักษะการเรียนรู้</Link>
              </li>
              <li>
                <Link to="/category/Sports and Outdoor Play">กีฬา & ของเล่นกลางแจ้ง</Link>
              </li>
              <li>
                <Link to="/category/Baby and Toddler Toys">ของเล่นเด็กเล็ก</Link>
              </li>
              <li>
                <Link to="/category/Remote Control and Play Vehicles">วิทยุบังคับ & รถเด็กเล่น</Link>
              </li>
              <li>
                <Link to="/category/Action Figures and Collectibles">ของเล่นเพื่อการสะสม</Link>
              </li>
              <li>
                <Link to="/category/Dolls and Accessories">ตุ๊กตา & บ้านตุ๊กตา</Link>
              </li>
            </ul>
            <h4 className="category-name"><FontAwesome name="soccer-ball-o" />
              | กีฬา & กิจกรรมการแจ้ง</h4>
            <ul className="sub-category-list">
              <li>
                <Link to="/category/Yoga and Fitness">โยคะและฟิตเนส</Link>
              </li>
              <li>
                <Link to="/category/Outdoor and Adventure">กิจกรรมกลางแจ้งและผจญภัย</Link>
              </li>
              <li>
                <Link to="/category/Men's shoes and clothing">รองเท้าและชุดกีฬาผู้ชาย</Link>
              </li>
              <li>
                <Link to="/category/Women's shoes and clothing">รองเท้าและชุดกีฬาผู้หญิง</Link>
              </li>
              <li>
                <Link to="/category/Team Sports">กีฬาประเภททีม</Link>
              </li>
              <li>
                <Link to="/category/Racquet Sports">ไม้แร็กเก็ต</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h4 className="category-name"><FontAwesome name="child" />
              | เด็กอ่อนและเด็กวัยหัดเดิน</h4>
            <ul className="sub-category-list">
              <li>
                <Link to="/category/Feeding">อาหาร & นม</Link>
              </li>
              <li>
                <Link to="/category/Diapering and Potty">ผ้าอ้อม & โถนั่งเด็ก</Link>
              </li>
              <li>
                <Link to="/category/Baby Gear">รถเข็น</Link>
              </li>
              <li>
                <Link to="/category/Health and Safety">อุปกรณ์เพื่อสุขภาพเด็ก</Link>
              </li>
              <li>
                <Link to="/category/Clothing and Accessories">เสื้อผ้าเด็ก</Link>
              </li>
              <li>
                <Link to="/category/Nursery">ที่นอนเด็ก</Link>
              </li>
            </ul>
            <h4 className="category-name"><FontAwesome name="bed" />
              | เครื่องใช้ & ของตกแต่งบ้าน</h4>
            <ul className="sub-category-list">
              <li>
                <Link to="/category/Kitchen and Dining">ห้องครัว</Link>
              </li>
              <li>
                <Link to="/category/Furniture">เฟอร์นิเจอร์</Link>
              </li>
              <li>
                <Link to="/category/Home Improvement">อุปกรณ์ปรับปรุงบ้าน</Link>
              </li>
              <li>
                <Link to="/category/Lighting">(หลอด)ไฟ</Link>
              </li>
              <li>
                <Link to="/category/Home Decor">ของตกแต่งบ้าน</Link>
              </li>
              <li>
                <Link to="/category/Pet Supplies">สัตว์เลี้ยง</Link>
              </li>
            </ul>
            <h4 className="category-name"><FontAwesome name="paw" />
              | อุปกรณ์สัตว์เลี้ยง</h4>
            <ul className="sub-category-list">
              <li>
                <Link to="/category/Dog Food">อาหารสุนัข</Link>
              </li>
              <li>
                <Link to="/category/Dog Glooming Supplies">อุปกรณ์อาบน้ำและแต่งขนสุนัข</Link>
              </li>
              <li>
                <Link to="/category/Dog Clean Up and Toilet">อุปกรณ์ขับถ่าย</Link>
              </li>
              <li>
                <Link to="/category/Cat Food">อาหารแมว</Link>
              </li>
              <li>
                <Link to="/category/Cat Clean Up and Toilet">อุปกรณ์ขับถ่ายและห้องน้ำ</Link>
              </li>
              <li>
                <Link to="/category/Bird Fish Small Animals">นก ปลา สัตว์เลี้ยงขนาดเล็ก</Link>
              </li>
            </ul>
            <h4 className="category-name"><FontAwesome name="flash" />
              | เครื่องใช้ไฟฟ้า</h4>
            <ul className="sub-category-list">
              <li>
                <Link to="/category/Small Kitchen Appliances">เครื่องใช้ไฟฟ้าในครัวขนาดเล็ก</Link>
              </li>
              <li>
                <Link to="/category/Cooling and Heating">เครื่องทำความร้อนและความเย็น</Link>
              </li>
              <li>
                <Link to="/category/Large Appliances">เครื่องใช้ไฟฟ้าขนาดใหญ่</Link>
              </li>
              <li>
                <Link to="/category/Garment Care">อุปกรณ์ถนอมผ้า</Link>
              </li>
              <li>
                <Link to="/category/Housekeeping">อุปกรณ์ดูแลบ้าน</Link>
              </li>
              <li>
                <Link to="/category/Electronics Appliance">อุปกรณ์เครื่องใช้ไฟฟ้า</Link>
              </li>
            </ul>
            <h4 className="category-name"><FontAwesome name="car" />
              | ยานยนต์, ดนตรี & สื่อบันเทิง</h4>
            <ul className="sub-category-list">
              <li>
                <Link to="/category/Tools and Equipment">เครื่องมือและอุปกรณ์ยานยนต์</Link>
              </li>
              <li>
                <Link to="/category/Interior Accessories">อุปกรณ์ภายในรถ</Link>
              </li>
              <li>
                <Link to="/category/Car Care">อุปกรณ์ดูแลรถยนต์</Link>
              </li>
              <li>
                <Link to="/category/Gadgets">เครื่องมือและอุปกรณ์</Link>
              </li>
              <li>
                <Link to="/category/Musical Instrument">เครื่องดนตรี</Link>
              </li>
              <li>
                <Link to="/category/Books">หนังสือ</Link>
              </li>
            </ul>
            <h4 className="category-name"><FontAwesome name="plane" />
              | ท่องเที่ยวและกระเป๋าเดินทาง</h4>
            <ul className="sub-category-list">
              <li>
                <Link to="/category/Luggage">กระเป๋าเดินทาง</Link>
              </li>
              <li>
                <Link to="/category/Backpacks">กระเป๋าแบ็กแพ็ก</Link>
              </li>
              <li>
                <Link to="/category/Laptop Bags and Cases">เคสและกระเป๋าใส่แล็ปท็อป</Link>
              </li>
              <li>
                <Link to="/category/Travel Accessories">อุปกรณ์สำหรับเดินทาง</Link>
              </li>
              <li>
                <Link to="/category/Packing Organizers">อุปกรณ์จัดระเบียบ</Link>
              </li>
              <li>
                <Link to="/category/Bags">กระเป๋าสำหรับเดินทาง</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h4 className="category-name"><FontAwesome name="mobile" />
              | โทรศัพท์มือถือ & แท็บเล็ต</h4>
            <ul className="sub-category-list">
              <li>
                <Link to="/category/Mobiles">โทรศัพท์มือถือ</Link>
              </li>
              <li>
                <Link to="/category/Tablet">แท็บเล็ต</Link>
              </li>
              <li>
                <Link to="/category/Power Banks">แบตเตอรี่สำรอง</Link>
              </li>
              <li>
                <Link to="/category/Phone Cases">เคสและซองมือถือ</Link>
              </li>
              <li>
                <Link to="/category/Batteries and Chargers">แบตเตอรี่ และอุปกรณ์ชาร์จไฟ</Link>
              </li>
              <li>
                <Link to="/category/Mobiles Accessories">อุปกรณ์เสริมอื่นๆ</Link>
              </li>
            </ul>
            <h4 className="category-name"><FontAwesome name="camera-retro" />
              | กล้อง</h4>
            <ul className="sub-category-list">
              <li>
                <Link to="/category/Sports and Action Cameras">กล้องวีดีโอ & แอ็คชั่นแคม</Link>
              </li>
              <li>
                <Link to="/category/Point and Shoot Cameras">กล้องคอมแพค</Link>
              </li>
              <li>
                <Link to="/category/DSLRs">กล้อง DSLR</Link>
              </li>
              <li>
                <Link to="/category/Mirrorless Cameras">กล้องมิลเลอร์เลส</Link>
              </li>
              <li>
                <Link to="/category/Drones">โดรน</Link>
              </li>
              <li>
                <Link to="/category/Camera Accessories">
                  อุปกรณ์เสริม</Link>
              </li>
            </ul>
            <h4 className="category-name"><FontAwesome name="desktop" />
              | คอมพิวเตอร์ & แล็ปท็อป</h4>
            <ul className="sub-category-list">
              <li>
                <Link to="/category/Laptops">แล็ปท็อป</Link>
              </li>
              <li>
                <Link to="/category/Computers">คอมพิวเตอร์</Link>
              </li>
              <li>
                <Link to="/category/PC Gaming">PC Gaming</Link>
              </li>
              <li>
                <Link to="/category/Storage">อุปกรณ์จัดเก็บข้อมูล</Link>
              </li>
              <li>
                <Link to="/category/Printers and Inks">เครื่องพิมพ์และอุปกรณ์</Link>
              </li>
              <li>
                <Link to="/category/Computer Accessories">อุปกรณ์เสริมอื่นๆ</Link>
              </li>
            </ul>
            <h4 className="category-name"><FontAwesome name="television" />
              | ทีวี,เครื่องเสียง,วิดีโอ,ฯลฯ</h4>
            <ul className="sub-category-list">
              <li>
                <Link to="/category/Televisions">ทีวี</Link>
              </li>
              <li>
                <Link to="/category/Audio">เครื่องเสียง</Link>
              </li>
              <li>
                <Link to="/category/Video">วีดีโอ</Link>
              </li>
              <li>
                <Link to="/category/Gaming">เกม</Link>
              </li>
              <li>
                <Link to="/category/Wearable Tech">อุปกรณ์ไอทีสวมใส่</Link>
              </li>
            </ul>
            <img
              src="http://icons.iconarchive.com/icons/icons8/windows-8/512/Data-List-icon.png"
              alt="list-icon"
              id="list-icon"
            />
          </div>
          <hr />
        </div>
        <Footer />
      </div>
    );
  }
}

export default CategoryPage;
