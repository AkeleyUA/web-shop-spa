import {
  takeLatest,
  put,
  call,
} from 'redux-saga/effects';
import { callToastAction } from '../Toast/action';
import { addCategorySuccessAction, addCategoryFailureAction, ADD_CATEGORY_REQUEST } from './action';
import { getCategorySuccessAction } from '../Categories/action';

const fetchAddNewCategory = (name) => {
  return fetch('/api/categories/add', {
    method: 'POST',
    body: JSON.stringify({name}),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(response => response.json())
}

function* addCategoryWorker(action) {
  try {
    const data = yield call(fetchAddNewCategory, action.payload)
    if (data.status) {
      yield put(getCategorySuccessAction(data.categories))
      yield put(addCategorySuccessAction())
      yield put(callToastAction(data.message))
    } else {
      yield put(addCategoryFailureAction(data.message))
      yield put(callToastAction(data.message, 'error'))
    }
  } catch (e) {
    yield put(addCategoryFailureAction(e))
    yield put(callToastAction(e.message, 'error'))
  }
}

function* addCategoryWatcher() {
  yield takeLatest(ADD_CATEGORY_REQUEST, addCategoryWorker)
}

export default addCategoryWatcher