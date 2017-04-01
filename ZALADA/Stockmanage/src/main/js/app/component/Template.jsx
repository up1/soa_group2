import React from 'react';
import {Link, BrowserRouter, Route} from 'react-router-dom';

class Template extends React.Component{

    render(){
        return (
            <div><Link to="/list"> List</Link> </div>
        )
    }
}

export default Template