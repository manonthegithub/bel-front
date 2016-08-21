/**
 * Страница с букбоксами и возможностью их заказа
 */

require('expose?$!expose?jQuery!jquery');
require('bootstrap-webpack!../../bootstrap.config.js');
require('../../styles/style.less');

var ReactDOM = require('react-dom');
var React = require('react');
import {CommonProductInfo} from '../components/productViewComponent';


class Product extends React.Component {
    render(){
      return(
        <div className="row">
            <div className="box">
                <CommonProductInfo
                    id={this.props.id}
                    name={this.props.name}
                    price={this.props.price}
                    image={this.props.image}
                    description={this.props.description} />
            </div>
        </div>
      );
    }
};

class ProductList extends React.Component {
  state = {
   data: [],
  }

  componentDidMount() {
    $.ajax({
      url: this.props.url,
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }



  render() {
    var productNodes = this.state.data.map(function(prod) {
      return (
        <Product
            name={prod.name}
            price={prod.price}
            image={prod.imageLink}
            description={prod.description}
            id={prod.id}
            />
      );
    }.bind(this));
    return (
      <div className="container">
        {productNodes}
      </div>
    );
  }
};


ReactDOM.render(
  <ProductList url="/api/boxes"/>,
  document.getElementById('boxes-list')
);
