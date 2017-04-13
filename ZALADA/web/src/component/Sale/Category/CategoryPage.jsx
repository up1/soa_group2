import React from 'react'
import Navbar from '../UpperHeaderSection.jsx'
import Footer from '../FooterSection.jsx'
import FontAwesome from 'react-fontawesome'
import '../css/category.css'

class CategoryPage extends React.Component {

    render() {
        return (
            <div id="category-page">
                <Navbar/>
                <div className="container-fluid category-body">
                    <h1> เลือกสินค้าตามประเภท </h1>
                    <div className="col-md-4">
                        <h4 className="category-name">แฟชั่นสุภาพสตรี</h4>
                        <ul className="sub-category-list">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <h4 className="category-name">แฟชั่นสุภาพบุรุษ</h4>
                        <ul className="sub-category-list">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <h4 className="category-name">สุขภาพและความงาม</h4>
                        <ul className="sub-category-list">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <h4 className="category-name">สินค้าอุปโภคบริโภค</h4>
                        <ul className="sub-category-list">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h4 className="category-name">เด็กอ่อนและเด็กวัยหัดเดิน</h4>
                        <ul className="sub-category-list">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <h4 className="category-name">เครื่องใช้ & ของตกแต่งบ้าน</h4>
                        <ul className="sub-category-list">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <h4 className="category-name">อุปกรณ์สัตว์เลี้ยง</h4>
                        <ul className="sub-category-list">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <h4 className="category-name">เครื่องใช้ไฟฟ้า</h4>
                        <ul className="sub-category-list">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h4 className="category-name">โทรศัพท์มือถือ & แท็บเล็ต</h4>
                        <ul className="sub-category-list">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <h4 className="category-name"><FontAwesome name="camera-retro"/> กล้อง</h4>
                        <ul className="sub-category-list">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <h4 className="category-name">คอมพิวเตอร์ & แล็ปท็อป</h4>
                        <ul className="sub-category-list">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <h4 className="category-name">ทีวี, เครื่องเสียง,วิดีโอ, เกม & อุปกรณ์ไอทีสวมใส่</h4>
                        <ul className="sub-category-list">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <h4 className="category-name">กีฬา & กิจกรรมการแจ้ง</h4>
                        <ul className="sub-category-list">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <h4 className="category-name">ท่องเที่ยวและกระเป๋าเดินทาง</h4>
                        <ul className="sub-category-list">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <h4 className="category-name">เกม & ของเล่น</h4>
                        <ul className="sub-category-list">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <h4 className="category-name">ยานยนต์, ดนตรี & สื่อบันเทิง</h4>
                        <ul className="sub-category-list">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <hr/>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default CategoryPage;