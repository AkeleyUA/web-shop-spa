import {
  takeLatest,
  put,
  call
} from 'redux-saga/effects';
import {
  registrationSuccessAction,
  REGISTRATION_REQUEST,
  registrationFailureAction,
  LOGIN_REQUEST,
  loginSuccessAction,
  loginFailureAction,
  LOGOUT
} from './action';

import jwt from 'jsonwebtoken'

const fetchRegister = form => {
  return fetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ ...form }),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(response => response.json())
}

const fetchLogin = (form) => {
  return fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ ...form }),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(response => response.json())
}

function* registrationWorker(action) {
  try {
    const data = yield call(fetchRegister, action.payload)
    if (data.status) {
      yield put(registrationSuccessAction(data.message))
    } else {
      yield put(registrationFailureAction(data.message))
    }
  } catch (e) {
    yield put(registrationFailureAction('Произошла ошибка, перезагрузите страницу'))
  }
}

function* loginWorker(action) {
  try {
    const data = yield call(fetchLogin, action.payload)
    if (data.status) {
      yield put(loginSuccessAction(jwt.verify(data.token, 'miraj')))
      yield sessionStorage.setItem('token', data.token)
    } else {
      yield put(loginFailureAction(data.message))
    }
  } catch (e) {
    yield put(loginFailureAction('Произошла ошибка, перезагрузите страницу'))
  }
}

function* logoutWorker(action) {
  yield sessionStorage.removeItem('token')
}

function* authWatcher() {
  yield takeLatest(REGISTRATION_REQUEST, registrationWorker)
  yield takeLatest(LOGIN_REQUEST, loginWorker)
  yield takeLatest(LOGOUT, logoutWorker)
}

export default authWatcher
