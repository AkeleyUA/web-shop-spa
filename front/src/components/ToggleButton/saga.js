import { takeEvery, select, call } from 'redux-saga/effects'
import { ADD_TO_SHOPPING_CART, DEL_FROM_SHOPPING_CART } from './action'

const putToLocalStorage = (cart) => {
  localStorage.setItem('shopping-cart',  JSON.stringify(cart))
}

function* shoppingCartWorker() {
  const cart = yield select(state => state.shoppingCartState.cart)
  yield call(putToLocalStorage,cart)
}

function* shoppingCartWatcher() {
  yield takeEvery(ADD_TO_SHOPPING_CART, shoppingCartWorker)
  yield takeEvery(DEL_FROM_SHOPPING_CART, shoppingCartWorker)
}

export default shoppingCartWatcher