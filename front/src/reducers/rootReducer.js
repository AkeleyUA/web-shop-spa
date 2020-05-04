import { combineReducers } from 'redux'
import { authState } from '../components/AuthForm/reducer'
import { toastState } from '../components/Toast/reducer'
import { productsState } from '../components/ProductsList/reducer'
import { productCreatorState } from '../components/ProductCreator/reducer'
import { categoriesState } from '../components/Categories/reducer'
import { categoryCreatorState } from '../components/CategoryCreator/reducer'

export const rootReducer = combineReducers({
  authState,
  toastState,
  productsState,
  productCreatorState,
  categoriesState,
  categoryCreatorState,
})