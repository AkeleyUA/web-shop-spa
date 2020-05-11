import {
  LOGOUT,
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "./action"
import jwt from 'jsonwebtoken'

const token = (sessionStorage.getItem('token') ? sessionStorage.getItem('token') : false)

const checkToken = () => {
  try {
    return jwt.verify(token, 'miraj')
  } catch (e) {
    return false
  }
}

const initialState = {
  form: {},
  loading: false,
  token: checkToken(),
  isAuth: !!token,
  message: null
}

export const authState = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION_REQUEST:{
      return {
        ...state,
        form: action.payload,
        loading: true,
        message: null
      }
    }
    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        form: {
          email: '',
          password: ''
        },
        loading: false,
        message: action.payload
      }
    } 
    case REGISTRATION_FAILURE: {
      return {
        ...state,
        form: {
          email: '',
          password: ''
        },
        loading: false,
        message: action.payload
      }
    }     
    case LOGIN_REQUEST: {
      return {
        ...state,
        form: {
          email: '',
          password: ''
        },
        loading: true,
        message: null
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        form: {
          email: '',
          password: ''
        },
        loading: false,
        message: null,
        token: action.payload.token,
        isAuth: true
      }
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        loading: false,
        message: action.payload
      }
    }
    case LOGOUT: {
      return {
        ...state,
        token: null,
        isAuth: false,
        form: {
          email: '',
          password: '',
        },
        message: null
      }
    }
    default: return state;
  }
}