export const GET_NOT_CONFIRM_USERS_REQUEST = 'GET_NOT_CONFIRM_USERS_REQUEST'
export const GET_NOT_CONFIRM_USERS_SUCCESS = 'GET_NOT_CONFIRM_USERS_SUCCESS'
export const GET_NOT_CONFIRM_USERS_FAILURE = 'GET_NOT_CONFIRM_USERS_FAILURE'
export const CONFIRM_USER_REQUEST = 'CONFIRM_USER_REQUEST'
export const CONFIRM_USER_SUCCESS = 'CONFIRM_USER_SUCCESS'
export const CONFIRM_USER_FAILURE = 'CONFIRM_USER_FAILURE'
export const DELETE_NOT_CONFIRM_USER_REQUEST = 'DELETE_NOT_CONFIRM_USER_REQUEST'
export const DELETE_NOT_CONFIRM_USER_SUCCESS = 'DELETE_NOT_CONFIRM_USER_SUCCESS'
export const DELETE_NOT_CONFIRM_USER_FAILURE = 'DELETE_NOT_CONFIRM_USER_FAILURE'
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE'

export const getNotConfirmUsersRequestAction = () => {
  return {
    type: GET_NOT_CONFIRM_USERS_REQUEST
  }
}

export const getNotConfirmUsersSuccessAction = users => {
  return {
    type: GET_NOT_CONFIRM_USERS_SUCCESS,
    payload: users
  }
}

export const getNotConfirmUsersFailureAction = message => {
  return {
    type: GET_NOT_CONFIRM_USERS_FAILURE,
    payload: message
  }
}

export const clearMessageAction = () => {
  return {
    type: CLEAR_MESSAGE
  }
}

export const confirmUserRequestAction = id => {
  return {
    type: CONFIRM_USER_REQUEST,
    payload: id
  }
}

export const confirmUserSuccessAction = (id, message) => {
  return {
    type: CONFIRM_USER_SUCCESS,
    payload: { id, message }
  }
}

export const confirmUserFailureAction = message => {
  return {
    type: CONFIRM_USER_FAILURE,
    payload: message
  }
}

export const deleteUserRequestAction = id => {
  return {
    type: DELETE_NOT_CONFIRM_USER_REQUEST,
    payload: id
  }
}

export const deleteUserSuccessAction = (id, message) => {
  return {
    type: DELETE_NOT_CONFIRM_USER_SUCCESS,
    payload: { id, message }
  }
}

export const deleteUserFailureAction = message => {
  return {
    type: DELETE_NOT_CONFIRM_USER_FAILURE,
    payload: message
  }
}