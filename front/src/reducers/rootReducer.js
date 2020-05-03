import { combineReducers } from 'redux'
import { authState } from '../components/AuthForm/reducer'
import { toastState } from '../components/Toast/reducer'
import { productsState } from '../components/ProductsList/reducer'

export const rootReducer = combineReducers({
  authState,
  toastState,
  productsState,
})