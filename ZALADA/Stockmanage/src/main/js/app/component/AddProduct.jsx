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
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        const data = {
            name : this.state.name,
            detail : this.state.detail,
            price : this.state.price,
            amount : this.state.amount
        }
        console.log(data);
        axios.post("http://localhost:9001/product", data).then(
            (response) => {console.log(response)}
        )
        .catch(
            (error) => { console.log(error)}
        );
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

    render(){
        let previewImage = null;
        if(this.state.imagePreviewUrl){
            previewImage = (<img src={this.state.imagePreviewUrl}/>)
        }
        else{
            previewImage =  (<div>Please select an Image for Preview</div>)
        }
        return (
            <div>
            <form>
                <input type="file" onChange= {this.handleImageChange}/>
                <input name="name" id="name" onChange={this.handleChange} required type="text" value={this.state.name}/>
                <input name="detail" id="name" onChange={this.handleChange} required type="text" value={this.state.detail}/>
                <input name="price" id="price" onChange={this.handleChange} required type="number" value={this.state.price}/>
                <input name="amount" id="amount" onChange={this.handleChange} required type="number" value={this.state.amount}/>
                <button onClick={this.handleSubmit}>Submit</button>
            </form>
            {previewImage}
            </div>
        )
    }
}

export default AddProduct;