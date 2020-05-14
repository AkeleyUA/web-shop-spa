import { takeLatest, call, put } from 'redux-saga/effects'
import {
  GET_CATEGORIES_FOR_CLIENT_REQUEST,
  getCategoriesForClientSuccessAction,
  getCategoriesForClientFailureAction
} from './action'


const fetchCategoriesForClient = () => {
  return fetch('/api/categories/get/client').then(res => res.json())
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
    yield put(getCategoriesForClientFailureAction('Что-то пошло не так, перезагрузите страницу'))
  }
}

function* categoriesClientWatcher () {
  yield takeLatest(GET_CATEGORIES_FOR_CLIENT_REQUEST, getCategoriesForClientWorker)
}

export default categoriesClientWatcher