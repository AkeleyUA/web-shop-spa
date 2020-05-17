import { call, put, takeLatest } from 'redux-saga/effects'
import { getProductForEditSuccessAction, getProductForEditFalureAction, GET_PRODUCT_FOR_EDIT_REQUEST, SAVE_CHANGE_PRODUCT_REQUEST, saveChangeProductFailureAction, saveChangeProductSuccessAction } from './action'

const fetchProductForEdit = id => {
  return fetch('/api/products/edit', {
    method: 'POST',
    body: JSON.stringify({ id }),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(res => res.json())
}

const fetchSaveChange = ({ form, id }) => {
  return fetch('/api/products/save-change', {
    method: 'POST',
    body: JSON.stringify({ ...form, id}),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(res => res.json())
}

function* editProductWorker(action) {
  try {
    const data = yield call(fetchProductForEdit, action.payload)
    if (data.status) {
      yield put(getProductForEditSuccessAction(data.product))
    } else {
      yield put(getProductForEditFalureAction(data.message))
    }
  } catch (e) { }
}

function* saveChangeWorker(action) {
  try {
    const data = yield call(fetchSaveChange, action.payload)
    if (data.status) {
      yield put(saveChangeProductSuccessAction(data.product, data.message))
    } else {
      yield put(saveChangeProductFailureAction(data.message))
    }
  } catch (e) {
    yield put(saveChangeProductFailureAction('Данные не сохраненые, попробуйте ещё раз'))
  }
}

function* editProductWatcher() {
  yield takeLatest(GET_PRODUCT_FOR_EDIT_REQUEST, editProductWorker)
  yield takeLatest(SAVE_CHANGE_PRODUCT_REQUEST, saveChangeWorker)
}

export default editProductWatcher