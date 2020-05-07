import { takeLatest, call, put } from 'redux-saga/effects'
import { GET_PRODUCTS_FOR_CLIENT_REQUEST, getProductsForClientSuccessAction, getProductsForClientFailreAction, GET_CATEGORIES_FOR_CLIENT_REQUEST, getCategoriesForClientSuccessAction, getCategoriesForClientFailureAction } from './action'


const fetchProductsForClient = category => {
  return fetch('/api/products/get-products-for-clients', {
    method: 'POST',
    body: JSON.stringify({category}),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(res => res.json())
}

const fetchCategoriesForClient = () => {
  return fetch('api/categories/get-for-client').then(res => res.json())
}

function* getProductsForClientWorker (action) {
  try {
    const data = yield call(fetchProductsForClient, action.payload)
    if(data.status) {
      yield put(getProductsForClientSuccessAction(data.products))
    } else {
      yield put(getProductsForClientFailreAction(data.message))
    }
  } catch (e) {
    yield put(getProductsForClientFailreAction(e.message))
  }
}

function* getCategoriesForClientWorker () {
  try {
    const data = yield call(fetchCategoriesForClient)
    if(data.status) {
      yield put(getCategoriesForClientSuccessAction(data.categories))
    } else {
      yield put(getCategoriesForClientFailureAction(data.message))
    }
  } catch (e) {
    yield put(getCategoriesForClientFailureAction(e.message))
  }
}

function* forClientWatcher () {
  yield takeLatest(GET_PRODUCTS_FOR_CLIENT_REQUEST, getProductsForClientWorker)
  yield takeLatest(GET_CATEGORIES_FOR_CLIENT_REQUEST, getCategoriesForClientWorker)
}

export default forClientWatcher