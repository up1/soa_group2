import React from 'react'
import FooterSection from './FooterSection.jsx'
import UpperHeaderSection from './UpperHeaderSection.jsx'
import axios from 'axios'
import './css/confirm.css'

class ConfirmForm extends React.Component {

    constructor() {
        super()
        this.state = {
            name: '',
            tel: '',
            email: '',
            address: '',
            province: '',
            post_code: '',
            state: ''
        }

        this.handleChange = this
            .handleChange
            .bind(this)
        this.submitChange = this
            .submitChange
            .bind(this)
    }

    handleChange(event) {
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    submitChange() {
        const cart = this.props.cart
        const buyProducts = []
        let totalPrice = 0;
        for (let product in cart) {
            buyProducts.push(cart[product])
            totalPrice += cart[product].amount * cart[product].price;
        }
        const data = {
            buyer: this.state.name,
            totalPrice: totalPrice,
            buyProducts: buyProducts,
            deliveryAddress: this.state.address + " " + this.state.state + " " + this.state.province + " " + this.state.post_code,
            payStatus: 0,
            tel: this.state.tel,
            email: this.state.email
        }
        axios
            .post("http://localhost:9002/purchaseorder", data)
            .then((response) => {
                const purchaseorderId = response.data
                this.props.history.push(`/purchaseorder/${purchaseorderId}`)
                this.props.clearCart()
            })
            .catch((error) => (console.log(error)))
    }

    render() {
        return (
            <div>
                <UpperHeaderSection />
                    <div className="container" id="confirm-page">
                        <section className="container-signup">
                            <h1> ยืนยันการสั่งซื้อ </h1>
                            <div className="container-page" id="form-signup">
                                <div className="col-md-12">

                                    <div className="form-group col-lg-12">
                                        <label>ชื่อ นามสกุล</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            onChange={this.handleChange} />
                                    </div>

                                    <div className="form-group col-lg-12">
                                        <label>โทรศัพท์</label>
                                        <input name="tel" className="form-control" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group col-lg-12">
                                        <label>อีเมล</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            onChange={this.handleChange} />
                                    </div>

                                    <div className="form-group col-lg-12">
                                        <label>ที่อยู่</label>
                                        <textarea name="address" className="form-control" onChange={this.handleChange} />
                                    </div>

                                    <div className="form-group col-lg-12">
                                        <label>รหัสไปรษณีย์</label>
                                        <input
                                            type="text"
                                            name="post_code"
                                            className="form-control"
                                            onChange={this.handleChange} />
                                    </div>

                                    <div className="form-group col-lg-12">
                                        <label>เขต/อำเภอ</label>
                                        <input
                                            type="text"
                                            name="state"
                                            className="form-control"
                                            onChange={this.handleChange} />
                                    </div>

                                    <div className="form-group col-lg-12">
                                        <label>
                                            จังหวัด
                                        </label>
                                        <select name="province" className="form-control" onChange={this.handleChange}>
                                            <option value="" defaultValue>--------- เลือกจังหวัด ---------</option>
                                            <option value="กรุงเทพมหานคร">กรุงเทพมหานคร</option>
                                            <option value="กระบี่">กระบี่
                                            </option>
                                            <option value="กาญจนบุรี">กาญจนบุรี
                                            </option>
                                            <option value="กาฬสินธุ์">กาฬสินธุ์
                                            </option>
                                            <option value="กำแพงเพชร">กำแพงเพชร
                                            </option>
                                            <option value="ขอนแก่น">ขอนแก่น</option>
                                            <option value="จันทบุรี">จันทบุรี</option>
                                            <option value="ฉะเชิงเทรา">ฉะเชิงเทรา
                                            </option>
                                            <option value="ชัยนาท">ชัยนาท
                                            </option>
                                            <option value="ชัยภูมิ">ชัยภูมิ
                                            </option>
                                            <option value="ชุมพร">ชุมพร
                                            </option>
                                            <option value="ชลบุรี">ชลบุรี
                                            </option>
                                            <option value="เชียงใหม่">เชียงใหม่
                                            </option>
                                            <option value="เชียงราย">เชียงราย
                                            </option>
                                            <option value="ตรัง">ตรัง
                                            </option>
                                            <option value="ตราด">ตราด
                                            </option>
                                            <option value="ตาก">ตาก
                                            </option>
                                            <option value="นครนายก">นครนายก
                                            </option>
                                            <option value="นครปฐม">นครปฐม
                                            </option>
                                            <option value="นครพนม">นครพนม
                                            </option>
                                            <option value="นครราชสีมา">นครราชสีมา
                                            </option>
                                            <option value="นครศรีธรรมราช">นครศรีธรรมราช
                                            </option>
                                            <option value="นครสวรรค์">นครสวรรค์
                                            </option>
                                            <option value="นราธิวาส">นราธิวาส
                                            </option>
                                            <option value="น่าน">น่าน
                                            </option>
                                            <option value="นนทบุรี">นนทบุรี
                                            </option>
                                            <option value="บึงกาฬ">บึงกาฬ</option>
                                            <option value="บุรีรัมย์">บุรีรัมย์</option>
                                            <option value="ประจวบคีรีขันธ์">ประจวบคีรีขันธ์
                                            </option>
                                            <option value="ปทุมธานี">ปทุมธานี
                                            </option>
                                            <option value="ปราจีนบุรี">ปราจีนบุรี
                                            </option>
                                            <option value="ปัตตานี">ปัตตานี
                                            </option>
                                            <option value="พะเยา">พะเยา
                                            </option>
                                            <option value="พระนครศรีอยุธยา">พระนครศรีอยุธยา
                                            </option>
                                            <option value="พังงา">พังงา
                                            </option>
                                            <option value="พิจิตร">พิจิตร
                                            </option>
                                            <option value="พิษณุโลก">พิษณุโลก
                                            </option>
                                            <option value="เพชรบุรี">เพชรบุรี
                                            </option>
                                            <option value="เพชรบูรณ์">เพชรบูรณ์
                                            </option>
                                            <option value="แพร่">แพร่
                                            </option>
                                            <option value="พัทลุง">พัทลุง
                                            </option>
                                            <option value="ภูเก็ต">ภูเก็ต
                                            </option>
                                            <option value="มหาสารคาม">มหาสารคาม
                                            </option>
                                            <option value="มุกดาหาร">มุกดาหาร
                                            </option>
                                            <option value="แม่ฮ่องสอน">แม่ฮ่องสอน
                                            </option>
                                            <option value="ยโสธร">ยโสธร
                                            </option>
                                            <option value="ยะลา">ยะลา
                                            </option>
                                            <option value="ร้อยเอ็ด">ร้อยเอ็ด
                                            </option>
                                            <option value="ระนอง">ระนอง
                                            </option>
                                            <option value="ระยอง">ระยอง
                                            </option>
                                            <option value="ราชบุรี">ราชบุรี</option>
                                            <option value="ลพบุรี">ลพบุรี
                                            </option>
                                            <option value="ลำปาง">ลำปาง
                                            </option>
                                            <option value="ลำพูน">ลำพูน
                                            </option>
                                            <option value="เลย">เลย
                                            </option>
                                            <option value="ศรีสะเกษ">ศรีสะเกษ</option>
                                            <option value="สกลนคร">สกลนคร</option>
                                            <option value="สงขลา">สงขลา
                                            </option>
                                            <option value="สมุทรสาคร">สมุทรสาคร
                                            </option>
                                            <option value="สมุทรปราการ">สมุทรปราการ
                                            </option>
                                            <option value="สมุทรสงคราม">สมุทรสงคราม
                                            </option>
                                            <option value="สระแก้ว">สระแก้ว
                                            </option>
                                            <option value="สระบุรี">สระบุรี
                                            </option>
                                            <option value="สิงห์บุรี">สิงห์บุรี
                                            </option>
                                            <option value="สุโขทัย">สุโขทัย
                                            </option>
                                            <option value="สุพรรณบุรี">สุพรรณบุรี
                                            </option>
                                            <option value="สุราษฎร์ธานี">สุราษฎร์ธานี
                                            </option>
                                            <option value="สุรินทร์">สุรินทร์
                                            </option>
                                            <option value="สตูล">สตูล
                                            </option>
                                            <option value="หนองคาย">หนองคาย
                                            </option>
                                            <option value="หนองบัวลำภู">หนองบัวลำภู
                                            </option>
                                            <option value="อำนาจเจริญ">อำนาจเจริญ
                                            </option>
                                            <option value="อุดรธานี">อุดรธานี
                                            </option>
                                            <option value="อุตรดิตถ์">อุตรดิตถ์
                                            </option>
                                            <option value="อุทัยธานี">อุทัยธานี
                                            </option>
                                            <option value="อุบลราชธานี">อุบลราชธานี</option>
                                            <option value="อ่างทอง">อ่างทอง
                                            </option>
                                            <option value="อื่นๆ">อื่นๆ</option>
                                        </select>

                                    </div>
                                    <div className="form-group col-lg-12">
                                        <button type="submit" className="btn btn-primary pull-right" onClick={this.submitChange}>ยืนยันการสั่งซื้อ</button>
                                    </div>

                                </div>

                                <div className="col-md-0"></div>
                            </div>
                        </section>
                    </div>

                <FooterSection />
            </div>

        )

    }

}
export default ConfirmForm