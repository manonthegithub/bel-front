require('expose?$!expose?jQuery!jquery');
require('bootstrap-webpack!../../bootstrap.config.js');
require('../../styles/style.less');

var ReactDOM = require('react-dom');
var React = require('react');
import {ProductListForAdmin} from '../components/productViewComponent';


ReactDOM.render(
  <ProductListForAdmin url="/api/adm/boxes"/>,
  document.getElementById('products-list')
);
