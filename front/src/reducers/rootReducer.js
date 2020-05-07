import { combineReducers } from 'redux'
import { authState } from '../components/AuthForm/reducer'
import { productsState } from '../components/ProductsList/reducer'
import { productCreatorState } from '../components/ProductCreator/reducer'
import { categoriesState } from '../components/Categories/reducer'
import { categoryCreatorState } from '../components/CategoryCreator/reducer'
import { currentCategoryState } from '../components/CategoriesList/reducer'
import { forClientState } from '../pages/Home.page/reducer'
import { filterState } from '../components/NavBar/reducer'
import { shoppingCartState } from '../components/ToggleButton/reducer'


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
})