require('../components/productViewComponent');
var ReactDOM = require('react-dom');
var React = require('react');

ReactDOM.render(
  <ProductListForAdmin url="/api/adm/boxes"/>,
  document.getElementById('products-list')
);
