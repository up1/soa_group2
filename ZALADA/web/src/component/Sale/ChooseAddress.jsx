import React from 'react';
import cookie from 'react-cookie';
import Navbar from './UpperHeaderSection';
import FooterSection from './FooterSection';
import './css/chooseaddress.css';
import { BillingService } from '../../util/AxiosWrapper';

class ChooseAddress extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectOption: '1',
      name: '',
      tel: '',
      email: '',
      address: '',
      province: '',
      post_code: '',
      state: '',
    };
    this.onSelectChange = this
      .onSelectChange
      .bind(this);
    this.handleChange = this
      .handleChange
      .bind(this);
    this.submitChange = this
      .submitChange
      .bind(this);
    this.submitButtonClick = this
      .submitButtonClick
      .bind(this);
  }

  onSelectChange(event) {
    this.setState({ selectOption: event.target.value });
  }

  handleChange(event) {
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  submitButtonClick() {
    if (this.state.selectOption === '2') {
      this.submitChange();
    } else {
      const cart = this.props.cart;
      const buyProducts = [];
      let totalPrice = 0;
      const productIdList = Object.keys(cart);
      for (let i = 0; i < productIdList.length; i += 1) {
        totalPrice += cart[productIdList[i]].amount * cart[productIdList[i]].price;
        buyProducts.push(cart[productIdList[i]]);
      }
      const data = {
        totalPrice,
        buyProducts,
      };
      const config = this.props.user ? {
        headers: { Authorization: cookie.load('access_token') },
      } : {};
      BillingService
        .post('/purchaseorder/?default=true', data, config)
        .then((response) => {
          const purchaseorderId = response.data;
          this
            .props
            .history
            .push(`/purchaseorder/${purchaseorderId}`);
          this
            .props
            .clearCart();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  submitChange() {
    const cart = this.props.cart;
    const buyProducts = [];
    let totalPrice = 0;
    const productIdList = Object.keys(cart);
    for (let i = 0; i < productIdList.length; i += 1) {
      totalPrice += cart[productIdList[i]].amount * cart[productIdList[i]].price;
      buyProducts.push(cart[productIdList[i]]);
    }
    const data = {
      buyer: this.state.name,
      billingName: this.state.name,
      totalPrice,
      buyProducts,
      deliveryAddress: `${this.state.address} ${this.state.state} ${this.state.province} ${this.state.post_code}`,
      payStatus: 0,
      tel: this.state.tel,
      email: this.state.email,
    };
    console.log(data);
    const config = this.props.user ? {
      headers: { Authorization: cookie.load('access_token') },
    } : {};
    BillingService
      .post('/purchaseorder/', data, config)
      .then((response) => {
        const purchaseorderId = response.data;
        this
          .props
          .history
          .push(`/purchaseorder/${purchaseorderId}`);
        this
          .props
          .clearCart();
      })
      .catch(error => (console.log(error)));
  }

  render() {
    const addressForm = (
      <div>
        <section className="container-signup">
          <h3>
            กรอกข้อมูลสำหรับจัดส่ง
          </h3>
          <div className="container-page" id="form-signup">
            <div className="col-md-12">
              <div className="form-group col-lg-12">
                <label htmlFor="name">ชื่อ นามสกุล</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  onChange={this.handleChange}
                />
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
                  onChange={this.handleChange}
                />
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
                  onChange={this.handleChange}
                />

              </div>

              <div className="form-group col-lg-12">
                <label>เขต/อำเภอ</label>
                <input
                  type="text"
                  name="state"
                  className="form-control"
                  onChange={this.handleChange}
                />
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
            </div>

          </div>
        </section>
      </div>
    );
    return (
      <div id="choose">
        <Navbar user={this.props.user} userLogout={this.props.userLogout} />
        <div className="container" id="chooseaddress-container">
          <h1>
            เลือกที่อยู่ที่จะจัดส่ง</h1>
          <div className="form-group">
            <label className="col-md-2 control-label" htmlFor="address">เลือกที่อยู่ที่จะจัดส่ง</label>
            <div className="col-md-10">
              <div className="checkbox">
                <label htmlFor="address-0">
                  <input
                    type="radio"
                    name="address"
                    id="address-0"
                    value="1"
                    onChange={this.onSelectChange}
                    checked={this.state.selectOption === '1'}
                  />
                  ใช้ที่อยู่เดิมตอนสมัคร
                </label>
              </div>
              <div className="checkbox">
                <label htmlFor="address-1">
                  <input
                    type="radio"
                    name="addre;ss"
                    id="address-1"
                    value="2"
                    onChange={this.onSelectChange}
                    checked={this.state.selectOption === '2'}
                  />
                  กรอกข้อมูลใหม่
                </label>
              </div>
            </div>
          </div>
          {this.state.selectOption === '2'
            ? addressForm
            : ''}
          <div className="form-group col-lg-12">
            <button
              type="submit"
              className="btn btn-primary pull-right"
              onClick={this.submitButtonClick}
            >ยืนยันการสั่งซื้อ</button>
          </div>
        </div>
        <FooterSection />
      </div>
    );
  }
}

export default ChooseAddress;
