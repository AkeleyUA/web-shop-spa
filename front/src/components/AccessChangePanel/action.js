export const GET_USERS_FOR_ADMIN_REQUEST = 'GET_USERS_FOR_ADMIN_REQUEST'
export const GET_USERS_FOR_ADMIN_SUCCESS = 'GET_USERS_FOR_ADMIN_SUCCESS'
export const GET_USERS_FOR_ADMIN_FAILURE = 'GET_USERS_FOR_ADMIN_FAILURE'
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE'
export const CHANGE_LEVEL_REQUEST = 'CHANGE_LEVEL_REQUEST'
export const CHANGE_LEVEL_SUCCESS = 'CHANGE_LEVEL_SUCESS'
export const CHANGE_LEVEL_FAILURE = 'CHANGE_LEVEL_FAILURE'
export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST'
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS'
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE'

export const getUsersForAdminRequesAction = () => {
  return {
    type: GET_USERS_FOR_ADMIN_REQUEST
  }
}

export const getUsersForAdminSuccessAction = users => {
  return {
    type: GET_USERS_FOR_ADMIN_SUCCESS,
    payload: users
  }
}

export const getUsersForAdminFailureAction = message => {
  return {
    type: GET_USERS_FOR_ADMIN_FAILURE,
    payload: message
  }
}

export const clearMessageAction = () => {
  return {
    type: CLEAR_MESSAGE
  }
}

export const changeLevelRequestAction = (id, level) => {
  return {
    type: CHANGE_LEVEL_REQUEST,
    payload: {
      id,
      level
    }
  }
}

export const changeLevelSuccessAction = (id, level, message) => {
  return {
    type: CHANGE_LEVEL_SUCCESS,
    payload: {
      message,
      id,
      level
    }
  }
}

export const changeLevelFalureAction = message => {
  return {
    type: CHANGE_LEVEL_FAILURE,
    payload: message
  }
}

export const deleteUserRequestAction = id => {
  return {
    type: DELETE_USER_REQUEST,
    payload: id
  }
}

export const deleteUserSuccessAction = (id, message) => {
  return {
    type: DELETE_USER_SUCCESS,
    payload: {
      id,
      message
    }
  }
}

export const deleteUserFailureAction = message => {
  return {
    type: DELETE_USER_FAILURE,
    payload: message
  }
}