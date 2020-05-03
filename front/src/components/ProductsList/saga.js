import {
  takeLatest,
  put,
  call,
} from 'redux-saga/effects';
import {
  getProductsSuccessAction,
  getProductsFailureAction,
  GET_PRODUCTS_REQUEST,
  SHOW_ON_WEB_SITE_REQUEST,
  showOnWebSiteSuccessAction,
  showOnWebSiteFailureAction
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
      yield put(showOnWebSiteSuccessAction(data.products))
    } else {
      yield put(showOnWebSiteFailureAction(data.message))
    }
  } catch (e) {
    yield put(showOnWebSiteFailureAction(e))
  }
}

function* productsWatcher() {
  yield takeLatest(GET_PRODUCTS_REQUEST, getProductsWorker)
  yield takeLatest(SHOW_ON_WEB_SITE_REQUEST, showOnWebSideWorker)
}

export default productsWatcher
