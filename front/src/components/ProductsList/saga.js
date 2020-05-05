import {
  takeLatest,
  put,
  call,
} from 'redux-saga/effects';
import {
  GET_PRODUCTS_REQUEST,
  getProductsSuccessAction,
  getProductsFailureAction,
  
  SHOW_ON_WEB_SITE_REQUEST,
  showOnWebSiteSuccessAction,
  showOnWebSiteFailureAction,
  
  DEL_PRODUCT_REQUEST,
  deleteProductSuccessAction,
  deleteProductFailureAction
} from './action';

const fetchProducts = () => {
  return fetch('/api/products/get-products', {
    method: 'GET',
  }).then(response => response.json())
}

const fetchShowOnWebSite = (payload) => {
  return fetch('/api/products/show', {
    method: 'POST',
    body: JSON.stringify({...payload}),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(response => response.json())
}

const fetchDelProduct = (id) => {
  return fetch('/api/products/del', {
    method: 'POST',
    body: JSON.stringify({id}),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(response => response.json())
}

function* getProductsWorker() {
  try {
    const data = yield call(fetchProducts)
    yield put(getProductsSuccessAction(data))
  } catch (e) {
    yield put(getProductsFailureAction(e))
  }
}

function* showOnWebSideWorker(action) {
  try {
    const data = yield call(fetchShowOnWebSite, action.payload)
    if(data.status) {
      yield put(showOnWebSiteSuccessAction(data.message))
      yield put(getProductsSuccessAction(data.products))
    } else {
      yield put(showOnWebSiteFailureAction(data.message))
    }
  } catch (e) {
    yield put(showOnWebSiteFailureAction(e.message))
  }
}

function* delProductWorker(action) {
  try {
    const data = yield call(fetchDelProduct, action.payload)
    if (data.status) {
      yield put(deleteProductSuccessAction(data.message))
      yield put(getProductsSuccessAction(data.products))
    } else {
      yield put(getProductsFailureAction(data.message))
    }
  } catch (e) {
    yield put(deleteProductFailureAction(e.message))
  }
}

function* productsWatcher() {
  yield takeLatest(GET_PRODUCTS_REQUEST, getProductsWorker)
  yield takeLatest(SHOW_ON_WEB_SITE_REQUEST, showOnWebSideWorker)
  yield takeLatest(DEL_PRODUCT_REQUEST, delProductWorker)
}

export default productsWatcher
