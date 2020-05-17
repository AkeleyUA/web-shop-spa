import { call, put, takeLatest, select } from 'redux-saga/effects'
import {
  GET_PRODUCTS_FOR_CLIENT_REQUEST,
  getProductsForClientSuccessAction,
  getProductsForClientFailureAction,
  SEARCH_PRODUCT_FOR_CLIENT_REQUEST,
  searchProductForClientSuccessAction,
  searchProductForClientFailureAction,
  GET_POPULAR_PRODUCTS_REQUEST,
  getPopularProductsSuccessAction,
  getPopularProductsFailureAction,
  GET_BEST_PRICE_PRODUCTS_REQUEST,
  getBestPriceProductsSuccessAction,
  getBestPriceProductsFailureAction
} from './action'


const fetchProductsForClient = ({ category, limit, page }) => {
  const validateCategory = (category === 'Все' ? null : category)
  return fetch('/api/products/get/client', {
    method: 'POST',
    body: JSON.stringify({ category: validateCategory, limit, page }),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(res => res.json())
}

const fetchSearchForClient = (value, limit, page) => {
  return fetch('/api/products/search/client', {
    method: 'POST',
    body: JSON.stringify({ value, limit, page }),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(res => res.json())
}

const fetchPopularProducts = (limit, page) => {
  return fetch('/api/products/get/popular', {
    method: 'POST',
    body: JSON.stringify({ limit, page }),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(res => res.json())
}

const fetchBestPriceProducts = (limit, page) => {
  return fetch('/api/products/get/best-price', {
    method: 'POST',
    body: JSON.stringify({ limit, page }),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(res => res.json())
}

function* getProductsForClientWorker(action) {
  try {
    const data = yield call(fetchProductsForClient, action.payload)
    if (data.status) {
      yield put(getProductsForClientSuccessAction(data.products, data.productsLength))
    } else {
      yield put(getProductsForClientFailureAction(data.message))
    }
  } catch (e) {
    yield put(getProductsForClientFailureAction('Что-то пошло не так, перезагрузите страницу'))
  }
}

function* searchProductForClientWorker(action) {
  const value = action.payload
  const page = yield select(state => state.clientProductsState.currentPage - 1)
  const limit = 16
  try {
    const data = yield call(fetchSearchForClient, value, limit, page)
    if (data.status) {
      yield put(searchProductForClientSuccessAction(data.products, data.productsLength))
    } else {
      yield put(searchProductForClientFailureAction(data.message))
    }
  } catch (e) {

  }
}

function* getPopularProductsWorker(action) {
  const { limit, page } = action.payload
  try {
    const data = yield call(fetchPopularProducts, limit, page)
    if (data.status) {
      yield put(getPopularProductsSuccessAction(data.products, data.productsLength))
    } else {
      yield put(getPopularProductsFailureAction(data.message))
    }
  } catch (e) { }
}

function* getBestPriceProductsWorker(action) {
  const { limit, page } = action.payload
  try {
    const data = yield call(fetchBestPriceProducts, limit, page)
    if (data.status) {
      yield put(getBestPriceProductsSuccessAction(data.products, data.productsLength))
    } else {
      yield put(getBestPriceProductsFailureAction(data.message))
    }
  } catch (e) { }
}

function* productsForClientWatcher() {
  yield takeLatest(GET_PRODUCTS_FOR_CLIENT_REQUEST, getProductsForClientWorker)
  yield takeLatest(SEARCH_PRODUCT_FOR_CLIENT_REQUEST, searchProductForClientWorker)
  yield takeLatest(GET_POPULAR_PRODUCTS_REQUEST, getPopularProductsWorker)
  yield takeLatest(GET_BEST_PRICE_PRODUCTS_REQUEST, getBestPriceProductsWorker)
}

export default productsForClientWatcher