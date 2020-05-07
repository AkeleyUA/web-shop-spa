import { all } from 'redux-saga/effects';
import authWatcher from '../components/AuthForm/saga'
import productsWatcher from '../components/Products.Admin/saga'
import addProductWatcher from '../components/ProductCreator/saga'
import categoriesWatcher from '../components/Categories.Admin/saga';
import addCategoryWatcher from '../components/CategoryCreator/saga';
import forClientWatcher from '../pages/Home.page/saga'
import filterWatcher from '../components/NavBar/saga';


export function* rootSaga() {
  yield all([
    authWatcher(),
    productsWatcher(),
    addProductWatcher(),
    categoriesWatcher(),
    addCategoryWatcher(),
    forClientWatcher(),
    filterWatcher()
  ]);
}
