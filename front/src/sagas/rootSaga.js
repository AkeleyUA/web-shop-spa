import { all } from 'redux-saga/effects';
import authWatcher from '../components/AuthForm/saga'
import productsWatcher from '../components/Products.Admin/saga'
import productsForClientWatcher from '../components/Products.Client/saga'
import addProductWatcher from '../components/ProductCreator/saga'
import categoriesWatcher from '../components/Categories.Admin/saga';
import addCategoryWatcher from '../components/CategoryCreator/saga';
import categoriesClientWatcher from '../components/Categories.Client/saga';
import shoppingCartWatcher from '../components/ToggleButton/saga'
import editProductWatcher from '../components/ProductEditor/saga';
import forAccessPanelWatcher from '../components/AccessChangePanel/saga'
import notConfirmUsersWatcher from '../components/RegistrationRequestPanel/saga';


export function* rootSaga() {
  yield all([
    authWatcher(),
    productsWatcher(),
    productsForClientWatcher(),
    addProductWatcher(),
    categoriesWatcher(),
    addCategoryWatcher(),
    categoriesClientWatcher(),
    shoppingCartWatcher(),
    editProductWatcher(),
    forAccessPanelWatcher(),
    notConfirmUsersWatcher(),
  ])
}
