import { call, put, takeLatest } from 'redux-saga/effects'
import {
  getUsersForAdminSuccessAction,
  getUsersForAdminFailureAction,
  GET_USERS_FOR_ADMIN_REQUEST,
  changeLevelSuccessAction,
  changeLevelFalureAction,
  CHANGE_LEVEL_REQUEST,
  deleteUserSuccessAction,
  deleteUserFailureAction,
  DELETE_USER_REQUEST
} from './action'

const fetchUsers = () => {
  return fetch('/api/users/get').then(res => res.json())
}

const fetchChangeLevel = (id, level) => {
  return fetch('/api/users/change/level', {
    method: 'POST',
    body: JSON.stringify({ id, level }),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(res => res.json())
}

const fetchDeleteUser = (id) => {
  return fetch('/api/users/delete', {
    method: 'POST',
    body: JSON.stringify({ id }),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(res => res.json())
}

function* getUsersForAccessPanelWorker() {
  try {
    const data = yield call(fetchUsers)
    if (data.status) {
      yield put(getUsersForAdminSuccessAction(data.users))
    } else {
      yield put(getUsersForAdminFailureAction(data.message))
    }
  } catch (e) {
    yield put(getUsersForAdminFailureAction('Что-то пошло не так, перезагрузите страницу'))
  }
}

function* changeUserLevelWorker(action) {
  const { id, level } = action.payload
  try {
    const data = yield call(fetchChangeLevel, id, level)
    if (data.status) {
      yield put(changeLevelSuccessAction(id, level, data.message))
    } else {
      yield put(changeLevelFalureAction(data.message))
    }
  } catch (e) {
    yield put(changeLevelFalureAction('Что-то пошло не так, перезагрузите страницу'))
  }
}

function* deleteUserWorker(action) {
  const id = action.payload
  try {
    const data = yield call(fetchDeleteUser, id)
    if (data.status) {
      yield put(deleteUserSuccessAction(id, data.message))
    } else {
      yield put(deleteUserFailureAction(data.message))
    }
  } catch (e) {
    yield put(deleteUserFailureAction('Что-то пошло не так, перезагрузите страницу'))
  }
}

function* forAccessPanelWatcher() {
  yield takeLatest(GET_USERS_FOR_ADMIN_REQUEST, getUsersForAccessPanelWorker)
  yield takeLatest(CHANGE_LEVEL_REQUEST, changeUserLevelWorker)
  yield takeLatest(DELETE_USER_REQUEST, deleteUserWorker)
}

export default forAccessPanelWatcher