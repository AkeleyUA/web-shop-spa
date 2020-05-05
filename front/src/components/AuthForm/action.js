export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST'
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS'
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT = 'LOGOUT'

export const registrationRequestAction = (form) => {
  return {
    type: REGISTRATION_REQUEST,
    payload: form
  }
}

export const registrationSuccessAction = (massage) => {
  return {
    type: REGISTRATION_SUCCESS,
    payload: massage
  }
}

export const registrationFailureAction = (massage) => {
  return {
    type: REGISTRATION_FAILURE,
    payload: massage
  }
}

export const loginRequestAction = (form) => {
  return {
    type: LOGIN_REQUEST,
    payload: form
  }
}

export const loginSuccessAction = (token) => {
  return {
    type: LOGIN_SUCCESS,
    payload: token
  }
}

export const loginFailureAction = (massage) => {
  return {
    type: LOGIN_FAILURE,
    payload: massage
  }
}


export const logoutAction = () => {
  return {
    type: LOGOUT
  }
}