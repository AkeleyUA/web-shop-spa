export const REGISTRATION = 'REGISTRATION'
export const LOGIN = 'LOGIN'
export const LOADING = 'LOADING'
export const TOKEN = 'TOKEN'
export const LOGOUT = 'LOGOUT'

export const registrationAction = (form) => {
  return {
    type: REGISTRATION,
    payload: form
  }
}

export const loginAction = (form) => {
  return {
    type: LOGIN,
    payload: form
  }
}

export const loadingAction = (status) => {
  return {
    type: LOADING,
    payload: status
  }
}

export const tokenAction = (token) => {
  return {
    type: TOKEN,
    payload: token
  }
}

export const logoutAction = () => {
  return {
    type: LOGOUT
  }
}