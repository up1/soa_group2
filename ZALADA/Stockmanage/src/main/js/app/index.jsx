import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Match, Miss} from 'react-router';

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

render(<Root/>, document.querySelector('#app'));