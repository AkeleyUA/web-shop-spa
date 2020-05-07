import { call, put, takeLatest } from 'redux-saga/effects'
import { SET_FILTER_VALUE } from './adction'
import { getProductsForClientSuccessAction, getProductsForClientFailreAction } from '../../pages/Home.page/action'
import { setCurrentCategoryAction } from '../Categories.Client/action'

const fetchFilteredProducts = (filterValue) => {
  return fetch('/api/products/get-filtered-products', {
    method: 'POST',
    body: JSON.stringify({filterValue}),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(res => res.json())
}

function* getFilteredProductsWorker(action) {
  yield put(setCurrentCategoryAction(''))
  try {
    const data = yield call(fetchFilteredProducts, action.payload)
    if(data.status) {
      yield put(getProductsForClientSuccessAction(data.products))
    } else {
      yield put(getProductsForClientFailreAction(data.message))
    }
  } catch (e) {
    yield put(getProductsForClientFailreAction('Произошла неизвестная ошибка'))
  }
}

function* filterWatcher () {
  yield takeLatest(SET_FILTER_VALUE, getFilteredProductsWorker)
}

export default filterWatcher