import React from 'react';
import {render} from 'react-dom';

import AddProduct from './component/AddProduct.jsx';
import ListProduct from './component/ListProduct.jsx';

class App extends React.Component {

  render () {
    return (<div>
          <ListProduct/>
        </div>
    )
  }
}

render(<App/>, document.getElementById('app'));