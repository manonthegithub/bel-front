import React, { Component } from 'react';
var imag = require('./Nikon-D810-Image-Sample-7.jpg');

export default class App extends Component {
  render() {
    return (
      <h1>Hello IRINA!.
      	<img src={imag} alt="Smiley face"></img>
      </h1>
    );
  }
}
