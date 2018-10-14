import * as _ from 'lodash'
import { combineReducers } from 'redux'
import { Actions, SubActionTypes } from './action';
import { Product, Sub } from '../../../../api/models/sub';

const products = (
  state = [] as Product[],
  action: Actions
  ): typeof state => {
  switch (action.type) {
    case SubActionTypes.SET_FETCHED_PRODUCTS:
      return action.products
    default:
      return state
  }
}

const subs = (
  state = [] as Sub[],
  action: Actions
  ): typeof state => {
  switch (action.type) {
    case SubActionTypes.SET_FETCHED_SUBS:
      return action.subs
    default:
      return state
  }
}

export default combineReducers({
  products,
  subs
})

