import React from 'react'
import UpperHeaderSection from './Sale/UpperHeaderSection.jsx'
import FooterSection from './Sale/FooterSection.jsx'
import './css/signupPage.css'


class SignUpPage extends React.Component {
    render() {
        return (
            <div className="signup_page">
                <UpperHeaderSection/>
                <div className="container-fluid" id="container-Sign">
                    <section className="container-signup">
                        <div className="container-page" id="form-signup">
                            <div className="col-md-6">
                                <h3 className="dark-grey">สร้างบัญชีลูกค้าใหม่</h3>

                                <div className="form-group col-lg-12">
                                    <label>ชื่อผู้ใช้</label>
                                    <input type="" name="" className="form-control" id="" value="" />
                                </div>

                                <div className="form-group col-lg-6">
                                    <label>รหัสผ่าน</label>
                                    <input type="password" name="" className="form-control" id="" value="" />
                                </div>

                                <div className="form-group col-lg-6">
                                    <label>ยืนยันรหัสผ่าน</label>
                                    <input type="password" name="" className="form-control" id="" value="" />
                                </div>

                                <div className="form-group col-lg-6">
                                    <label>Email Address</label>
                                    <input type="" name="" className="form-control" id="" value="" />
                                </div>

                                <div className="form-group col-lg-6">
                                    <label>ยืนยัน Email Address</label>
                                    <input type="" name="" className="form-control" id="" value="" />
                                </div>

                            </div>

                            <div className="col-md-6">
                                <h3 className="dark-grey">Terms and Conditions</h3>
                                <p>
                                    By clicking on "Register" you agree to The Company's' Terms and Conditions</p>
                                <p>
                                    While rare, prices are subject to change based on exchange rate fluctuations -
					should such a fluctuation happen, we may request an additional payment. You have the option to request a full refund or to pay the new price. (Paragraph 13.5.8)
				</p>
                                <p>
                                    Should there be an error in the description or pricing of a product, we will provide you with a full refund (Paragraph 13.5.6)</p>
                                <p>
                                    Acceptance of an order by us is dependent on our suppliers ability to provide the product. (Paragraph 13.5.6)</p>

                                <button type="submit" className="btn btn-primary">สมัครสมาชิก</button>
                            </div>
                        </div>
                    </section>
                </div>
                <FooterSection/>
            </div>
        )
    }
}

export default SignUpPage;