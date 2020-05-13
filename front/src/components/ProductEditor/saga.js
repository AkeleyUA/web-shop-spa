import { call, put, takeLatest } from 'redux-saga/effects'
import { getProductForEditSuccessAction, getProductForEditFalureAction, GET_PRODUCT_FOR_EDIT_REQUEST } from './action'

const fetchProductForEdit = id => {
  return fetch('/api/products/edit', {
    method: 'POST',
    body: JSON.stringify({id}),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(res => res.json())
}

function* editProductWorker(action) {
  try {
    const data = yield call(fetchProductForEdit, action.payload)
    if(data.status) {
      yield put(getProductForEditSuccessAction(data.product))
    } else {
      yield put(getProductForEditFalureAction(data.message))
    }
  } catch (e) {}
}

function* editProductWatcher() {
  yield takeLatest(GET_PRODUCT_FOR_EDIT_REQUEST, editProductWorker)
}

export default editProductWatcher