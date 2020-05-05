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

function* registrationWorker(action) {
  try {
    const data = yield call(fetchRegister, action.payload)
    if(data.status) {
      yield put(registrationSuccessAction(data.message))
    } else {
      yield put(registrationFailureAction(data.message))
    }
  } catch (e) {
    yield put(registrationFailureAction(e.message))
  }
}

function* loginWorker(action) {
  try {
    const data = yield call(fetchLogin, action.payload)
    if (data.status) {
      yield put(loginSuccessAction(data.token))
      yield sessionStorage.setItem('token', data.token)
    } else {
      yield put(loginFailureAction(data.message))
    }
  } catch (e) {
    yield put(loginFailureAction(e.message))
  }
}

function* logoutWorker() {
  yield sessionStorage.removeItem('token')
}

function* authWatcher() {
  yield takeLatest(REGISTRATION_REQUEST, registrationWorker)
  yield takeLatest(LOGIN_REQUEST, loginWorker)
  yield takeLatest(LOGOUT, logoutWorker)
}

export default authWatcher
