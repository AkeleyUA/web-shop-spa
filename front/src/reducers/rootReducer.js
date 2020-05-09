import { combineReducers } from 'redux'
import { authState } from '../components/AuthForm/reducer'
import { productsState } from '../components/Products.Admin/reducer'
import { productCreatorState } from '../components/ProductCreator/reducer'
import { categoriesState } from '../components/Categories.Admin/reducer'
import { categoryCreatorState } from '../components/CategoryCreator/reducer'
import { currentCategoryState } from '../components/Categories.Client/reducer'
import { forClientState } from '../pages/Home.page/reducer'
import { filterState } from '../components/NavBar/reducer'
import { shoppingCartState } from '../components/ToggleButton/reducer'
import { paginationState } from '../components/BottomNavBar/reducer'


export const rootReducer = combineReducers({
  authState,
  productsState,
  productCreatorState,
  categoriesState,
  categoryCreatorState,
  forClientState,
  currentCategoryState,
  filterState,
  shoppingCartState,
  paginationState,
})