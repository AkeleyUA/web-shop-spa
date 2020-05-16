import { combineReducers } from 'redux'
import { authState } from '../components/AuthForm/reducer'
import { clientProductsState } from '../components/Products.Client/reducer'
import { adminProductsState } from '../components/Products.Admin/reducer'
import { productCreatorState } from '../components/ProductCreator/reducer'
import { adminCategoriesState } from '../components/Categories.Admin/reducer'
import { categoryCreatorState } from '../components/CategoryCreator/reducer'
import { clientCategoriesState } from '../components/Categories.Client/reducer'
import { searchState } from '../components/ProductsFilter/reducer'
import { shoppingCartState } from '../components/ToggleButton/reducer'
import { stepsState } from '../components/OrderSteps/reducer'
import { editState } from '../components/ProductEditor/reducer'
import { accessState } from '../components/AccessChangePanel/reducer'
import { registrationRequestState } from '../components/RegistrationRequestPanel/reducer'


export const rootReducer = combineReducers({
  clientProductsState,
  authState,
  adminProductsState,
  productCreatorState,
  adminCategoriesState,
  categoryCreatorState,
  clientCategoriesState,
  searchState,
  shoppingCartState,
  stepsState,
  editState,
  accessState,
  registrationRequestState
})