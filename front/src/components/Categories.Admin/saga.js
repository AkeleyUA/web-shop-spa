import {
  takeLatest,
  put,
  call,
} from 'redux-saga/effects';
import {
  GET_CATEGORIES_FOR_ADMIN_REQUEST,
  getCategoriesSuccessAction,
  getCategoriesFailureAction,
  DEL_CATEGORY_REQUEST,
  deleteCategoryFailureAction,
  SHOW_CATEGORY_ON_WEB_SITE_REQUEST,
  showCategoryOnWebSiteFailureAction,
  showCategoryOnWebSiteSuccessAction,
  deleteCategorySuccessAction
} from './action';

const fetchCategories = () => {
  return fetch('/api/categories/get', {
    method: 'GET'
  }).then(res => res.json())
}

const fetchDeleteCategory = (id) => {
  return fetch('/api/categories/del', {
    method: 'POST',
    body: JSON.stringify({ id }),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(res => res.json())
}


const fetchShowCategoryOnWebSite = (payload) => {
  return fetch('/api/categories/show', {
    method: 'POST',
    body: JSON.stringify({ ...payload }),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(response => response.json())
}

function* getCategoriesWorker() {
  try {
    const data = yield call(fetchCategories)
    yield put(getCategoriesSuccessAction(data))
  } catch (e) {
    yield put(getCategoriesFailureAction('Неизвестная ошибка'))
  }
}

function* delCategoryWorker(action) {
  const id = action.payload
  try {
    const data = yield call(fetchDeleteCategory, action.payload)
    if (data.status) {
      yield put(deleteCategorySuccessAction(data.message, id))
    } else {
      yield put(deleteCategoryFailureAction(data.message))
    }
  } catch (e) {
    yield put(deleteCategoryFailureAction('Неизвестная ошибка'))
  }
}

function* showCategoryOnWebSiteWorker(action) {
  const id = action.payload.id
  try {
    const data = yield call(fetchShowCategoryOnWebSite, action.payload)
    if (data.status) {
      yield put(showCategoryOnWebSiteSuccessAction(data.message, id))
    } else {
      yield put(showCategoryOnWebSiteFailureAction(data.message))
    }
  } catch (e) {
    yield put(showCategoryOnWebSiteFailureAction('Неизвестная ошибка'))
  }
}

function* categoriesWatcher() {
  yield takeLatest(GET_CATEGORIES_FOR_ADMIN_REQUEST, getCategoriesWorker)
  yield takeLatest(DEL_CATEGORY_REQUEST, delCategoryWorker)
  yield takeLatest(SHOW_CATEGORY_ON_WEB_SITE_REQUEST, showCategoryOnWebSiteWorker)
}

export default categoriesWatcher