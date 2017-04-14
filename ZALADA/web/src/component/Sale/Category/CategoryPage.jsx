import React from 'react'
import Navbar from '../UpperHeaderSection.jsx'
import Footer from '../FooterSection.jsx'
import FontAwesome from 'react-fontawesome'
import '../css/category.css'

class CategoryPage extends React.Component {

    render() {
        return (
            <div id="category-page">
                <Navbar />
                <div className="container-fluid category-body">
                    <h1> <FontAwesome name="tags" /> เลือกสินค้าตามประเภท </h1>
                    <div className="col-md-4">
                        <h4 className="category-name"><FontAwesome name="venus" /> | แฟชั่นสุภาพสตรี</h4>
                        <ul className="sub-category-list">
                            <li>เสื้อผ้า</li>
                            <li>รองเท้า</li>
                            <li>กระเป๋า</li>
                            <li>นาฬิกา</li>
                            <li>แว่นตา</li>
                            <li>เครื่องประดับ</li>
                        </ul>
                        <h4 className="category-name"><FontAwesome name="mars" /> | แฟชั่นสุภาพบุรุษ</h4>
                        <ul className="sub-category-list">
                            <li>เสื้อผ้า</li>
                            <li>รองเท้า</li>
                            <li>กระเป๋า</li>
                            <li>นาฬิกา</li>
                            <li>แว่นตา</li>
                            <li>เครื่องประดับ</li>
                        </ul>
                        <h4 className="category-name"><FontAwesome name="medkit" /> | สุขภาพและความงาม</h4>
                        <ul className="sub-category-list">
                            <li>ผลิตภัณฑ์ดูแลผิวหน้า</li>
                            <li>เครื่องสำอาง</li>
                            <li>อุปกรณ์เสริมความงาม</li>
                            <li>น้ำหอม</li>
                            <li>อาหารเสริม</li>
                            <li>ผลิตภัณฑ์สำหรับผู้ชาย</li>
                        </ul>
                        <h4 className="category-name"><FontAwesome name="tag" /> | สินค้าอุปโภคบริโภค</h4>
                        <ul className="sub-category-list">
                            <li>อาหารเช้า</li>
                            <li>อาหารและเครื่องดื่ม</li>
                            <li>ลูกอมและขนม</li>
                            <li>อาหารกระป๋องและอาหารสำเร็จรูป</li>
                            <li>น้ำยาซักผ้า</li>
                            <li>วัตถุดิบเบเกอรี่</li>
                        </ul>
                        <h4 className="category-name"><FontAwesome name="gamepad" /> | เกม & ของเล่น</h4>
                        <ul className="sub-category-list">
                            <li>ของเล่นเสริมทักษะการเรียนรู้</li>
                            <li>กีฬา & ของเล่นกลางแจ้ง</li>
                            <li>ของเล่นเด็กเล็ก</li>
                            <li>วิทยุบังคับ & รถเด็กเล่น</li>
                            <li>ของเล่นเพื่อการสะสม</li>
                            <li>ตุ๊กตา & บ้านตุ๊กตา</li>
                        </ul>
                        <h4 className="category-name"><FontAwesome name="soccer-ball-o" /> | กีฬา & กิจกรรมการแจ้ง</h4>
                        <ul className="sub-category-list">
                            <li>โยคะและฟิตเนส</li>
                            <li>กิจกรรมกลางแจ้งและผจญภัย</li>
                            <li>รองเท้าและชุดกีฬาผู้ชาย</li>
                            <li>รองเท้าและชุดกีฬาผู้หญิง</li>
                            <li>กีฬาประเภททีม</li>
                            <li>ไม้แร็กเก็ต</li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h4 className="category-name"><FontAwesome name="child" /> | เด็กอ่อนและเด็กวัยหัดเดิน</h4>
                        <ul className="sub-category-list">
                            <li>อาหาร & นม</li>
                            <li>ผ้าอ้อม & โถนั่งเด็ก</li>
                            <li>รถเข็น</li>
                            <li>อุปกรณ์เพื่อสุขภาพเด็ก</li>
                            <li>เสื้อผ้าเด็ก</li>
                            <li>ที่นอนเด็ก</li>
                        </ul>
                        <h4 className="category-name"><FontAwesome name="bed" /> | เครื่องใช้ & ของตกแต่งบ้าน</h4>
                        <ul className="sub-category-list">
                            <li>ห้องครัว</li>
                            <li>เฟอร์นิเจอร์</li>
                            <li>อุปกรณ์ปรับปรุงบ้าน</li>
                            <li>ไฟ</li>
                            <li>ของตกแต่งบ้าน</li>
                            <li>สัตว์เลี้ยง</li>
                        </ul>
                        <h4 className="category-name"><FontAwesome name="paw" /> | อุปกรณ์สัตว์เลี้ยง</h4>
                        <ul className="sub-category-list">
                            <li>อาหารสุนัข</li>
                            <li>อุปกรณ์อาบน้ำและแต่งขนสุนัข</li>
                            <li>อุปกรณ์ขับถ่าย</li>
                            <li>อาหารแมว</li>
                            <li>อุปกรณ์ขับถ่ายและห้องน้ำ</li>
                            <li>นก ปลา สัตว์เลี้ยงขนาดเล็ก</li>
                        </ul>
                        <h4 className="category-name"><FontAwesome name="flash" /> | เครื่องใช้ไฟฟ้า</h4>
                        <ul className="sub-category-list">
                            <li>เครื่องใช้ไฟฟ้าในครัวขนาดเล็ก</li>
                            <li>เครื่องทำความร้อนและความเย็น</li>
                            <li>เครื่องใช้ไฟฟ้าขนาดใหญ่</li>
                            <li>อุปกรณ์ถนอมผ้า</li>
                            <li>อุปกรณ์ดูแลบ้าน</li>
                            <li>อุปกรณ์เครื่องใช้ไฟฟ้า</li>
                        </ul>
                        <h4 className="category-name"><FontAwesome name="car" /> | ยานยนต์, ดนตรี & สื่อบันเทิง</h4>
                        <ul className="sub-category-list">
                            <li>เครื่องมือและอุปกรณ์ยานยนต์</li>
                            <li>อุปกรณ์ภายในรถ</li>
                            <li>อุปกรณ์ดูแลรถยนต์</li>
                            <li>เครื่องมือและอุปกรณ์</li>
                            <li>เครื่องดนตรี</li>
                            <li>หนังสือ</li>
                        </ul>
                        <h4 className="category-name"><FontAwesome name="plane" /> | ท่องเที่ยวและกระเป๋าเดินทาง</h4>
                        <ul className="sub-category-list">
                            <li>กระเป๋าเดินทาง</li>
                            <li>กระเป๋าแบ็กแพ็ก</li>
                            <li>เคสและกระเป๋าใส่แล็ปท็อป</li>
                            <li>อุปกรณ์สำหรับเดินทาง</li>
                            <li>อุปกรณ์จัดระเบียบ</li>
                            <li>กระเป๋าสำหรับเดินทาง</li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h4 className="category-name"><FontAwesome name="mobile" /> | โทรศัพท์มือถือ & แท็บเล็ต</h4>
                        <ul className="sub-category-list">
                            <li>โทรศัพท์มือถือ</li>
                            <li>แท็บเล็ต</li>
                            <li>แบตเตอรี่สำรอง</li>
                            <li>เคสและซองมือถือ</li>
                            <li>แบตเตอรี่ และอุปกรณ์ชาร์จไฟ</li>
                            <li>อุปกรณ์เสริมอื่นๆ</li>
                        </ul>
                        <h4 className="category-name"><FontAwesome name="camera-retro" /> | กล้อง</h4>
                        <ul className="sub-category-list">
                            <li>กล้องวีดีโอ & แอ็คชั่นแคม</li>
                            <li>กล้องคอมแพค</li>
                            <li>กล้อง DSLR</li>
                            <li>กล้องมิลเลอร์เลส</li>
                            <li>โดรน</li>
                            <li>อุปกรณ์เสริม</li>
                        </ul>
                        <h4 className="category-name"><FontAwesome name="desktop" /> | คอมพิวเตอร์ & แล็ปท็อป</h4>
                        <ul className="sub-category-list">
                            <li>แล็ปท็อป</li>
                            <li>คอมพิวเตอร์</li>
                            <li>PC Gaming</li>
                            <li>อุปกรณ์จัดเก็บข้อมูล</li>
                            <li>เครื่องพิมพ์และอุปกรณ์</li>
                            <li>อุปกรณ์เสริมอื่นๆ</li>
                        </ul>
                        <h4 className="category-name"><FontAwesome name="television" /> | ทีวี,เครื่องเสียง,วิดีโอ,ฯลฯ</h4>
                        <ul className="sub-category-list">
                            <li>ทีวี</li>
                            <li>เครื่องเสียง</li>
                            <li>วีดีโอ</li>
                            <li>เกม</li>
                            <li>อุปกรณ์ไอทีสวมใส่</li>
                            <li>อุปกรณ์เสริมอื่นๆ</li>
                        </ul>
                        <img src="http://icons.iconarchive.com/icons/icons8/windows-8/512/Data-List-icon.png" alt="list-icon" id="list-icon"/>
                    </div>
                    <hr />
                </div>
                <Footer />
            </div>
        )
    }
}

export default CategoryPage;