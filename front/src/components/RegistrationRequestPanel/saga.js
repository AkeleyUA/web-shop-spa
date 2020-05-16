import { call, put, takeLatest } from 'redux-saga/effects'
import {
  GET_NOT_CONFIRM_USERS_REQUEST,
  getNotConfirmUsersSuccessAction,
  getNotConfirmUsersFailureAction,
  CONFIRM_USER_REQUEST,
  confirmUserFailureAction,
  confirmUserSuccessAction,
  DELETE_NOT_CONFIRM_USER_REQUEST,
  deleteUserSuccessAction,
  deleteUserFailureAction
} from './action'

const fetchNotConfirmUsers = () => {
  return fetch('/api/users/get/not-confirm').then(res => res.json())
}

const fetchConfirmUser = (id) => {
  return fetch('/api/users/confirm', {
    method: 'POST',
    body: JSON.stringify({id}),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(res => res.json())
}
const fetchDeleteUser = (id) => {
  return fetch('/api/users/delete', {
    method: 'POST',
    body: JSON.stringify({id}),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(res => res.json())
}

function* getNotConfirmUsersWorker () {
  try {
    const data = yield call(fetchNotConfirmUsers)
    if(data.status) {
      yield put(getNotConfirmUsersSuccessAction(data.users))
    } else {
      yield put(getNotConfirmUsersFailureAction(data.message))
    }
  } catch (e) {
    yield put(getNotConfirmUsersFailureAction('Что-то пошло не так, перезагрузите страницу'))
  }
}

function* confirmUserWorker (action) {
  const id = action.payload
  try {
    const data = yield call(fetchConfirmUser, id)
    if(data.status) {
      yield put(confirmUserSuccessAction(id, data.message))
    } else {
      yield put(confirmUserFailureAction(data.message))
    }
  } catch (e) {
    yield put(confirmUserFailureAction('Что-то пошло не так, перезагрузите страницу'))
  }
}

function* deleteUserWorker (action) {
  const id = action.payload
  try {
    const data = yield call(fetchDeleteUser, id)
    if(data.status) {
      yield put(deleteUserSuccessAction, id, data.message)
    } else {
      yield put(deleteUserFailureAction, data.message)
    }
  } catch (e) {
    yield put(deleteUserFailureAction('Что-то пошло не так, перезагрузите страницу'))
  }
}

function* notConfirmUsersWatcher () {
  yield takeLatest(GET_NOT_CONFIRM_USERS_REQUEST, getNotConfirmUsersWorker)
  yield takeLatest(CONFIRM_USER_REQUEST, confirmUserWorker)
  yield takeLatest(DELETE_NOT_CONFIRM_USER_REQUEST, deleteUserWorker)
}

export default notConfirmUsersWatcher