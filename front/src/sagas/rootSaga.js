import { all } from 'redux-saga/effects';
import authWatcher from '../components/AuthForm/saga'
import productsWatcher from '../components/ProductsList/saga'
import addProductWatcher from '../components/ProductCreator/saga'
import categoriesWatcher from '../components/Categories/saga';
import addCategoryWatcher from '../components/CategoryCreator/saga';


export function* rootSaga() {
  yield all([
    authWatcher(),
    productsWatcher(),
    addProductWatcher(),
    categoriesWatcher(),
    addCategoryWatcher(),
  ]);
}
