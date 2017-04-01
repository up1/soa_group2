import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Match, Miss, Link, Router, Route} from 'react-router';

import App from './component/App.jsx';
import AddProduct from './component/AddProduct.jsx';
import ListProduct from './component/ListProduct.jsx';
import UpdateProduct from './component/UpdateProduct.jsx';

const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={ListProduct} />
        <Match pattern="/AddProduct" component={AddProduct} />
        <Match pattern="/Update/:id" component={UpdateProduct} />        
      </div>
    </BrowserRouter>
  )
}

render(<App/>, document.querySelector('#app'));