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
    if (data.status) {
      yield put(addProductSuccessAction(data.message))
    } 
    if (data.errors) {
      yield put(addProductFailureAction(data.message))
    }
  } catch (e) {
    yield put(addProductFailureAction(e.message))
  }
}

function* addProductWatcher() {
  yield takeLatest(ADD_PRODUCT_REQUEST, addProductWorker)
}

export default addProductWatcher