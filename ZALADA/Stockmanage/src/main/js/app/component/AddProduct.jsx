import React from 'react';
import axios from 'axios';

class AddProduct extends React.Component{
    
    constructor(){
        super();
        this.state = {
            imagefile: '',
            imagePreviewUrl : '',
            name : '',
            detail : '',
            price : '',
            amount : '',
            category: 'เสื้อผ้า',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        const sender = axios.create({
         baseURL: 'localhost:9001'
        
        });
    }

    handleSubmit(event){
        event.preventDefault();
        const category = {
            name : "Electronic Accessory"
        }
        console.log(JSON.stringify(category));
        const data = {
            name : this.state.name,
            detail : this.state.detail,
            price : this.state.price,
            amount : this.state.amount,
            category : category,
        }
        console.log(data);
        axios.post("http://localhost:9001/product", data).then(
            (response) => {
                console.log("success")
                console.log(response.data)
                const productId = response.data
                this.uploadImage( productId)
            }
        )
        .catch(
            (error) => { console.log(error)}
        );

        
    }

    uploadImage(productId){
        const instance = axios.create();
        let data = new FormData();
        data.append('file', this.state.imagefile)
        data.append('productId', productId)
        instance.post("http://localhost:9001/product/image", data)
        .then(
            (response) => {
                console.log(response)
            }
        )
        .catch(
            (error) => {
                console.log(error)
            }
        )
    }

    handleChange(event){
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    handleImageChange(event){
        event.preventDefault();
        let reader = new FileReader();
        console.log(event.target);
        let file = event.target.files[0];

        reader.onloadend = () => {
            this.setState( {
                imagefile : file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file);
    }

    /*
        <label  htmlFor="file-input"> กรุณาเลือกรูปภาพสินค้า </label>

    */

    render(){
        let previewImage = null;
        if(this.state.imagePreviewUrl){
            previewImage = (<img src={this.state.imagePreviewUrl} className="img-responsive center-block" alt="product image"/>)
        }
        else{
            previewImage =  (<h3><span className="glyphicon glyphicon-upload" aria-hidden="true"></span> กรุณาเลือกรูปภาพสินค้า</h3>)
        }
        return (
                <div className="container">
                    <h1> ลงขายสินค้า </h1> <hr/>
                    <div className="preview">
                        {previewImage} <br/>
                    </div>
                    <form>
                        <div className="form-group">
                            <input type="file" onChange={ this.handleImageChange} id="file-input"/>
                        </div>
                        <div className="form-group">
                            <label  htmlFor="name"> <h3> ชื่อสินค้า </h3> </label>
                            <input name="name" id="name" onChange={this.handleChange} required type="text" value={this.state.name} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label  htmlFor="detail"> <h3>รายละเอียดสินค้า</h3> </label>
                            <input name="detail" id="detail" onChange={this.handleChange} required type="text" value={this.state.detail} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label  htmlFor="price"> <h3>ราคา (บาท)</h3></label>
                            <input name="price" id="price" onChange={this.handleChange} required type="number" value={this.state.price} className="form-control" min="1" max="1000000"/>
                        </div>
                            <div className="form-group">
                                <label  htmlFor="category"> <h3>ประเภทของสินค้า</h3> </label>
                                <select name="category" id="category" onChange={this.handleChange} value={this.state.category} className="form-control">
                                <option value="เสื้อผ้า">เสื้อผ้า</option>
                                <option value="รองเท้า">รองเท้า</option>
                                <option value="กระเป๋า">กระเป๋า</option>
                                <option value="นาฬิกา">นาฬิกา</option>
                                <option value="แว่นตา">แว่นตา</option>
                                <option value="เครื่องประดับ">เครื่องประดับ</option>
                                <option value="ผลิตภัณฑ์ดูแลผิวหน้า">ผลิตภัณฑ์ดูแลผิวหน้า</option>
                                <option value="เครื่องสำอาง">เครื่องสำอาง</option>
                                <option value="อุปกรณ์เสริมความงาม">อุปกรณ์เสริมความงาม</option>
                                <option value="น้ำหอม">น้ำหอม</option>
                                <option value="อาหารเสริม">อาหารเสริม</option>
                                <option value="ผลิตภัณฑ์สำหรับผู้ชาย">ผลิตภัณฑ์สำหรับผู้ชาย</option>
                                <option value="อาหาร &amp; นม">อาหาร &amp; นม</option>
                                <option value="ผ้าอ้อม &amp; โถนั่งเด็ก">ผ้าอ้อม &amp; โถนั่งเด็ก</option>
                                <option value="รถเข็น">รถเข็น</option>
                                <option value="อุปกรณ์เพื่อสุขภาพเด็ก">อุปกรณ์เพื่อสุขภาพเด็ก</option>
                                <option value="เสื้อผ้าเด็ก">เสื้อผ้าเด็ก</option>
                                <option value="ที่นอนเด็ก">ที่นอนเด็ก</option>
                                <option value="ห้องครัว">ห้องครัว</option>
                                <option value="เฟอร์นิเจอร์">เฟอร์นิเจอร์</option>
                                <option value="อุปกรณ์ปรับปรุงบ้าน">อุปกรณ์ปรับปรุงบ้าน</option>
                                <option value="ไฟ">ไฟ</option>
                                <option value="ของตกแต่งบ้าน">ของตกแต่งบ้าน</option>
                                <option value="สัตว์เลี้ยง">สัตว์เลี้ยง</option>
                                <option value="เครื่องใช้ไฟฟ้าในครัวขนาดเล็ก">เครื่องใช้ไฟฟ้าในครัวขนาดเล็ก</option>
                                <option value="เครื่องทำความร้อนและความเย็น">เครื่องทำความร้อนและความเย็น</option>
                                <option value="เครื่องใช้ไฟฟ้าขนาดใหญ่">เครื่องใช้ไฟฟ้าขนาดใหญ่</option>
                                <option value="อุปกรณ์ถนอมผ้า">อุปกรณ์ถนอมผ้า</option>
                                <option value="อุปกรณ์ดูแลบ้าน">อุปกรณ์ดูแลบ้าน</option>
                                <option value="อุปกรณ์เครื่องใช้ไฟฟ้า">อุปกรณ์เครื่องใช้ไฟฟ้า</option>
                                <option value="โทรศัพท์มือถือ">โทรศัพท์มือถือ</option>
                                <option value="แท็บเล็ต">แท็บเล็ต</option>
                                <option value="แบตเตอรี่สำรอง">แบตเตอรี่สำรอง</option>
                                <option value="เคสและซองมือถือ">เคสและซองมือถือ</option>
                                <option value="แบตเตอรี่ และอุปกรณ์ชาร์จไฟ">แบตเตอรี่ และอุปกรณ์ชาร์จไฟ</option>
                                <option value="อุปกรณ์เสริมอื่นๆ">อุปกรณ์เสริมอื่นๆ</option>
                                <option value="แล็ปท็อป">แล็ปท็อป</option>
                                <option value="คอมพิวเตอร์">คอมพิวเตอร์</option>
                                <option value="PC Gaming">PC Gaming</option>
                                <option value="อุปกรณ์จัดเก็บข้อมูล">อุปกรณ์จัดเก็บข้อมูล</option>
                                <option value="เครื่องพิมพ์และอุปกรณ์">เครื่องพิมพ์และอุปกรณ์</option>
                                <option value="กล้องวีดีโอ &amp; แอ็คชั่นแคม">กล้องวีดีโอ &amp; แอ็คชั่นแคม</option>
                                <option value="กล้องคอมแพค">กล้องคอมแพค</option>
                                <option value="กล้อง DSLR">กล้อง DSLR</option>
                                <option value="กล้องมิลเลอร์เลส">กล้องมิลเลอร์เลส</option>
                                <option value="โดรน">โดรน</option>
                                <option value="ทีวี">ทีวี</option>
                                <option value="เครื่องเสียง">เครื่องเสียง</option>
                                <option value="วีดีโอ">วีดีโอ</option>
                                <option value="เกม">เกม</option>
                                <option value="อุปกรณ์ไอทีสวมใส่">อุปกรณ์ไอทีสวมใส่</option>
                                <option value="โยคะและฟิตเนส">โยคะและฟิตเนส</option>
                                <option value="กิจกรรมกลางแจ้งและผจญภัย">กิจกรรมกลางแจ้งและผจญภัย</option>
                                <option value="รองเท้าและชุดกีฬาผู้ชาย">รองเท้าและชุดกีฬาผู้ชาย</option>
                                <option value="รองเท้าและชุดกีฬาผู้หญิง">รองเท้าและชุดกีฬาผู้หญิง</option>
                                <option value="กีฬาประเภททีม">กีฬาประเภททีม</option>
                                <option value="ไม้แร็กเก็ต">ไม้แร็กเก็ต</option>
                                <option value="กระเป๋าเดินทาง">กระเป๋าเดินทาง</option>
                                <option value="กระเป๋าแบ็กแพ็ก">กระเป๋าแบ็กแพ็ก</option>
                                <option value="เคสและกระเป๋าใส่แล็ปท็อป">เคสและกระเป๋าใส่แล็ปท็อป</option>
                                <option value="อุปกรณ์สำหรับเดินทาง">อุปกรณ์สำหรับเดินทาง</option>
                                <option value="อุปกรณ์จัดระเบียบ">อุปกรณ์จัดระเบียบ</option>
                                <option value="กระเป๋าสำหรับเดินทาง">กระเป๋าสำหรับเดินทาง</option>
                                <option value="ของเล่นเสริมทักษะการเรียนรู้">ของเล่นเสริมทักษะการเรียนรู้</option>
                                <option value="กีฬา &amp; ของเล่นกลางแจ้ง">กีฬา &amp; ของเล่นกลางแจ้ง</option>
                                <option value="ของเล่นเด็กเล็ก">ของเล่นเด็กเล็ก</option>
                                <option value="วิทยุบังคับ &amp; รถเด็กเล่น">วิทยุบังคับ &amp; รถเด็กเล่น</option>
                                <option value="ของเล่นเพื่อการสะสม">ของเล่นเพื่อการสะสม</option>
                                <option value="ตุ๊กตา &amp; บ้านตุ๊กตา">ตุ๊กตา &amp; บ้านตุ๊กตา</option>
                                <option value="เครื่องมือและอุปกรณ์ยานยนต์">เครื่องมือและอุปกรณ์ยานยนต์</option>
                                <option value="อุปกรณ์ภายในรถ">อุปกรณ์ภายในรถ</option>
                                <option value="อุปกรณ์ดูแลรถยนต์">อุปกรณ์ดูแลรถยนต์</option>
                                <option value="เครื่องมือและอุปกรณ์">เครื่องมือและอุปกรณ์</option>
                                <option value="เครื่องดนตรี">เครื่องดนตรี</option>
                                <option value="หนังสือ">หนังสือ</option>
                            </select>
                            </div>
                            <div className="form-group">
                                <label  htmlFor="amount"> <h3>จำนวนของสินค้า (ชิ้น)</h3> </label>
                                <input name="amount" id="amount" onChange={this.handleChange} required type="number" value={this.state.amount} className="form-control" min="1" max="100"/>
                            </div>
                        <button onClick={this.handleSubmit} className="btn btn-primary btn-lg pull-right" type="button">Submit</button>
                    </form>
                </div>
        )
    }
}

export default AddProduct;