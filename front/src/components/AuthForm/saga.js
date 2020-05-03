import {
  takeLatest,
  select,
  put,
  call
} from 'redux-saga/effects';
import { REGISTRATION, LOGIN, loadingAction, tokenAction, LOGOUT } from './action';
import { callToastAction } from '../Toast/action';

const fetchRegister = form => {
  return fetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({...form}),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(response => response.json())
}

const fetchLogin = (form) => {
  return fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({...form}),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(response => response.json())
}

function* registrationWorker() {
  yield put(loadingAction(true))
  const form = yield select(state => state.authState.form)
  try {
    const data = yield call(fetchRegister, form)
    yield put(callToastAction(data.message, (data.errors ? 'error' : 'success')))
    yield put(loadingAction(false))
  } catch (e) {
    yield put(callToastAction(e, 'error'))
    yield put(loadingAction(false))
  }
}

function* loginWorker() {
  yield put(loadingAction(true))
  const form = yield select(state => state.authState.form)
  try {
    const data = yield call(fetchLogin, form)
    if (data.errors) {
      yield put(callToastAction(data.message, 'error'))
    }
    if (data.token) {
      yield put(tokenAction(data.token))
      sessionStorage.setItem('token', data.token)
    }
    yield put(loadingAction(false))
  } catch (e) {
    yield put(callToastAction(e, 'error'))
    yield put(loadingAction(false))
  }
}

function* logoutWorker() {
  yield sessionStorage.removeItem('token')
}

function* authWatcher() {
  yield takeLatest(REGISTRATION, registrationWorker)
  yield takeLatest(LOGIN, loginWorker)
  yield takeLatest(LOGOUT, logoutWorker)
}

export default authWatcher
