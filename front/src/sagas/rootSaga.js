import { all } from 'redux-saga/effects';
import authWatcher from '../components/AuthForm/saga'
import productsWatcher from '../components/ProductsList/saga'

export function* rootSaga() {
  yield all([
    authWatcher(),
    productsWatcher(),
  ]);
}
