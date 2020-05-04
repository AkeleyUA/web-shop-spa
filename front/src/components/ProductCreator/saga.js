import {
  takeLatest,
  put,
  call,
} from 'redux-saga/effects';
import {
  ADD_PRODUCT_REQUEST,
  addProductSuccessAction,
  addProductFailureAction
} from './action';
import { callToastAction } from '../Toast/action';

const fetchAddNewProduct = (form) => {
  return fetch('/api/products/add', {
    method: 'POST',
    body: JSON.stringify({...form}),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(response => response.json())
}

function* addProductWorker(action) {
  try {
    const data = yield call(fetchAddNewProduct, action.payload)
    console.log(data)
    if (data.status) {
      yield put(addProductSuccessAction())
      yield put(callToastAction(data.message))
    } 
    if (data.errors) {
      yield put(addProductFailureAction(data.message))
      yield put(callToastAction(data.message, 'error'))
    }
  } catch (e) {
    yield put(addProductFailureAction(e))
    yield put(callToastAction(e.message, 'error'))
  }
}

function* addProductWatcher() {
  yield takeLatest(ADD_PRODUCT_REQUEST, addProductWorker)
}

export default addProductWatcher