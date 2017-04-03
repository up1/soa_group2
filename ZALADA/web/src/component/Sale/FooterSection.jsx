import React from 'react';
import "./css/FooterSection.css";

class FooterSection extends React.Component {
    render() {
        return (
            <div id="footer-section">
                <center>
                <div className="container-Footer">
                    <div className="row">
                        <h3 className="footertext">เกี่ยวกับ</h3>
                        <br />
                        <div className="col-md-4">
                            <img src="http://oi60.tinypic.com/w8lycl.jpg" className="img-circle" alt="the-brains" />
                            <br />
                            <h4 className="footertext">Programmers</h4>
                            <p className="footertext">ขอบคุณโปรแกรมเมอร์ทุกคนที่เขียนโค๊ดอย่างบ้าคลั่ง.</p><br />
                        </div>
                        <div className="col-md-4">
                            <img src="http://oi60.tinypic.com/2z7enpc.jpg" className="img-circle" alt="..." />
                            <br />
                            <h4 className="footertext">Artists</h4>
                            <p className="footertext">รูปทุกรูปถูกสรรหามาจากความคิดสร้างสรรค์ของคนเหล่านี้.</p><br />
                        </div>
                        <div className="col-md-4">
                            <img src="http://oi61.tinypic.com/307n6ux.jpg" className="img-circle" alt="..." />
                            <br />
                            <h4 className="footertext">Designers</h4>
                            <p className="footertext">การออกแบบเป็นชีวิตจิตใจของพวกเขา.</p><br />
                        </div>
                    </div>
                </div>
                </center>
            </div>

        )
    }
}

export default FooterSection;