require('expose?$!expose?jQuery!jquery');
require('bootstrap-webpack!../../bootstrap.config.js');
require('../../styles/style.less');

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { AdminProductList } from '../components/productViewComponent'


const initialState = {
  data: []
}

const productReducer = (state = initialState, action)=>{
  if (typeof state === 'undefined') {
    return initialState
  }

  switch (action.type) {
    case 'ADD':
      return Object.assign({}, state, {
        data: [
          ...state.data,
          action.item
        ]
      })
    case 'REMOVE':
      return Object.assign({}, state, {
        data: state.data.filter((x) => x.id != action.id )
      })
    case 'SET_NEW_DATA':
      return Object.assign({}, state, {
        data: action.array
      })
    default:
      return state
  }

}

let store = createStore(productReducer, initialState)

render(
  <Provider store={store}>
    <AdminProductList url="http://localhost/api/adm/boxes" />
  </Provider>,
  document.getElementById('products-list')
)
