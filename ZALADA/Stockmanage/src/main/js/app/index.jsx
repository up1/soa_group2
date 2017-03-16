import React from 'react';
import {render} from 'react-dom';

import AddProduct from './component/AddProduct.jsx';

class App extends React.Component {

  render () {
    return (<div>
          <p> Hello React!</p>
          <AddProduct/>
        </div>
    )
  }
}

render(<App/>, document.getElementById('app'));