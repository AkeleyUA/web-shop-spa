import { REGISTRATION, LOADING, LOGIN, LOGOUT, TOKEN } from "./action"

const token = (sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null)

const initialState = {
  form: {},
  loading: false,
  token,
  isAuth: (token ? true : false) 
}

export const authState = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION:
      return {...state, form: action.payload}
    case LOGIN: 
      return {...state, form: action.payload}
    case LOGOUT: {
      return {...state, token: null, isAuth: false}
    }
    case TOKEN: {
      return {...state, isAuth: action.payload}
    }
    case LOADING: 
      return {...state, loading: action.payload}
    default: return state;
  }
}