import {
  takeLatest,
  put,
  call,
} from 'redux-saga/effects';
import {
 GET_CATEGORIES_REQUEST,
 getCategorySuccessAction,
 getCategoryFailureAction,
 DEL_CATEGORY_REQUEST,
 deleteCategoryFailureAction,
 SHOW_CATEGORY_ON_WEB_SITE_REQUEST,
 showCategoryOnWebSiteFailureAction,
 showCategoryOnWebSiteSuccessAction
} from './action';
import { callToastAction } from '../Toast/action';

const fetchCategories = () => {
  return fetch('/api/categories/get', {
    method: 'GET'
  }).then(res => res.json())
}

const fetchDeleteCategory = (id) => {
  return fetch('/api/categories/del', {
    method: 'POST',
    body: JSON.stringify({id}),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(res => res.json())
}


const fetchShowCategoryOnWebSite = (payload) => {
  return fetch('/api/categories/show', {
    method: 'POST',
    body: JSON.stringify({...payload}),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(response => response.json())
}

function* getCategoriesWorker () {
  try {
    const data = yield call(fetchCategories)
    yield put(getCategorySuccessAction(data))
  } catch (e) {
    yield put(getCategoryFailureAction(e.message))
    yield put(callToastAction('Что-то пошло не так, перезагрузите страницу', 'error'))
  }
}

function* delCategoryWorker(action) {
  try {
    const data = yield call(fetchDeleteCategory, action.payload)
    if (data.status) {
      yield put(getCategorySuccessAction(data.categories))
      yield put(callToastAction(data.message))
    } else {
      yield put(deleteCategoryFailureAction(data.message))
      yield put(callToastAction(data.message, 'error'))
    }
  } catch (e) {
    yield put(deleteCategoryFailureAction(e.message))
    yield put(callToastAction(e.message, 'error'))
  }
 }

 function* showCategoryOnWebSiteWorker(action) {
   try {
    const data = yield call(fetchShowCategoryOnWebSite, action.payload)
    if (data.status) {
      yield put(getCategorySuccessAction(data.categories))
      yield put(showCategoryOnWebSiteSuccessAction())
      yield put(callToastAction(data.message))
    } else {
      yield put(showCategoryOnWebSiteFailureAction(data.message))
      yield put(callToastAction(data.message, 'error'))
    }
   } catch (e) {
    yield put(showCategoryOnWebSiteFailureAction(e.message))
    yield put(callToastAction(e.message, 'error'))
   }
 }

function* categoriesWatcher() {
  yield takeLatest(GET_CATEGORIES_REQUEST, getCategoriesWorker)
  yield takeLatest(DEL_CATEGORY_REQUEST, delCategoryWorker)
  yield takeLatest(SHOW_CATEGORY_ON_WEB_SITE_REQUEST, showCategoryOnWebSiteWorker)
}

export default categoriesWatcher