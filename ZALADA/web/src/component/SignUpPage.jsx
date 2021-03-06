import React from 'react';
import UpperHeaderSection from './Sale/UpperHeaderSection';
import FooterSection from './Sale/FooterSection';
import './css/signupPage.css';
import { MemberService } from '../util/AxiosWrapper';

class SignUpPage extends React.Component {

  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      password_re: '',
      email: '',
      email_re: '',
      address: '',
      province: '',
      post_code: '',
      state: '',
      tel: '',
      name: '',
    };

    this.handleChange = this
      .handleChange
      .bind(this);
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
  }

  handleChange(event) {
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  handleSubmit() {
    const data = {
      signIn: {
        username: this.state.username,
        password: this.state.password,
      },
      member: {
        name: this.state.name,
        tel: this.state.tel,
        address: `${this.state.address} ${this.state.state} ${this.state.province} ${this.state.post_code}`,
        email: this.state.email,
      },
    };

    MemberService
      .post('/member/signup', data)
      .then(() => {
        this
          .context
          .router
          .history
          .push('/');
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(data);
  }

  render() {
    return (
      <div className="signup_page">
        <UpperHeaderSection user={this.props.user} userLogout={this.props.userLogout} />
        <div className="container-fluid" id="container-Sign">
          <section className="container-signup">
            <div className="container-page" id="form-signup">
              <div className="col-md-12">
                <h3 className="dark-grey">สร้างบัญชีลูกค้าใหม่</h3>

                <div className="form-group col-lg-12">
                  <label htmlFor="username">ชื่อผู้ใช้</label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    className="form-control"
                    onChange={this.handleChange}
                  />
                </div>

                <div className="form-group col-lg-6">
                  <label htmlFor="password">รหัสผ่าน</label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="form-control"
                    onChange={this.handleChange}
                  />
                </div>

                <div className="form-group col-lg-6">
                  <label htmlFor="password_re">ยืนยันรหัสผ่าน</label>
                  <input
                    id="password_re"
                    type="password"
                    name="password_re"
                    className="form-control"
                    onChange={this.handleChange}
                  />
                </div>

                <div className="form-group col-lg-6">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="text"
                    name="email"
                    className="form-control"
                    onChange={this.handleChange}
                  />
                </div>

                <div className="form-group col-lg-6">
                  <label htmlFor="email_re">ยืนยัน Email Address</label>
                  <input
                    id="email_re"
                    type="text"
                    name="email_re"
                    className="form-control"
                    onChange={this.handleChange}
                  />
                </div>

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
                <div className="form-group">
                  <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>
                  สมัครสมาชิก
                </button>
                </div>
              </div>

            </div>
          </section>
        </div>
        <FooterSection />
      </div>
    );
  }
}

SignUpPage.contextTypes = {
  router: React.PropTypes.object,
};

export default SignUpPage;
