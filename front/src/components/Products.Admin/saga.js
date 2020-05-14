import {
  takeLatest,
  put,
  call,
  select
} from 'redux-saga/effects';
import {
  GET_PRODUCTS_FOR_ADMIN_REQUEST,
  getProductsForAdminSuccessAction,
  getProductsForAdminFailureAction,
  SHOW_ON_WEB_SITE_REQUEST,
  showOnWebSiteSuccessAction,
  showOnWebSiteFailureAction,
  DEL_PRODUCT_REQUEST,
  deleteProductSuccessAction,
  deleteProductFailureAction,
  SEARCH_PRODUCT_FOR_ADMIN_REQUEST,
  searchProductForAdminSuccessAction,
  searchProductForAdminFailureAction
} from './action';

const fetchProducts = ({limit, page}) => {
  return fetch('/api/products/get/admin', {
    method: 'POST',
    body: JSON.stringify({limit, page}),
    headers: {
      'Content-type': 'application/json'
    }

  }).then(response => response.json())
}

const fetchSearchForAdmin = (value, limit, page) => {
  return fetch('/api/products/search/admin', {
    method: 'POST',
    body: JSON.stringify({value, limit, page}),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(res => res.json())
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

function* getProductsForAdminWorker(action) {
  try {
    const data = yield call(fetchProducts, action.payload)
    yield put(getProductsForAdminSuccessAction(data.products, data.productsLength))
  } catch (e) {
    yield put(getProductsForAdminFailureAction('Неизвестная ошибка'))
  }
}

function* searchProductForAdminWorker (action) {
  const value = action.payload
  const page = yield select(state => state.adminProductsState.currentPage - 1)
  const limit = 16
  try {
    const data = yield call(fetchSearchForAdmin, value, limit, page)
    if(data.status) {
      yield put(searchProductForAdminSuccessAction(data.products, data.productsLength))
    } else {
      yield put(searchProductForAdminFailureAction(data.message))
    }
  } catch (e) {

  }
}
function* showOnWebSideWorker(action) {
  const id = action.payload.id
  try {
    const data = yield call(fetchShowOnWebSite, action.payload)
    if(data.status) {
      yield put(showOnWebSiteSuccessAction(data.message, id))
    } else {
      yield put(showOnWebSiteFailureAction(data.message))
    }
  } catch (e) {
    yield put(showOnWebSiteFailureAction('Неизвестная ошибка'))
  }
}

function* delProductWorker(action) {
  const id = action.payload
  console.log(id)
  try {
    const data = yield call(fetchDelProduct, action.payload)
    if (data.status) {
      yield put(deleteProductSuccessAction(data.message, id))
    }
  } catch (e) {
    yield put(deleteProductFailureAction('Неизвестная ошибка'))
  }
}

function* adminProductsWatcher() {
  yield takeLatest(GET_PRODUCTS_FOR_ADMIN_REQUEST, getProductsForAdminWorker)
  yield takeLatest(SEARCH_PRODUCT_FOR_ADMIN_REQUEST, searchProductForAdminWorker)
  yield takeLatest(SHOW_ON_WEB_SITE_REQUEST, showOnWebSideWorker)
  yield takeLatest(DEL_PRODUCT_REQUEST, delProductWorker)
}

export default adminProductsWatcher
