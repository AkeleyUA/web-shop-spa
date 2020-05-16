import {
  GET_NOT_CONFIRM_USERS_REQUEST,
  GET_NOT_CONFIRM_USERS_SUCCESS,
  GET_NOT_CONFIRM_USERS_FAILURE,
  CLEAR_MESSAGE,
  CONFIRM_USER_REQUEST,
  CONFIRM_USER_SUCCESS,
  CONFIRM_USER_FAILURE,
  DELETE_NOT_CONFIRM_USER_REQUEST,
  DELETE_NOT_CONFIRM_USER_SUCCESS,
  DELETE_NOT_CONFIRM_USER_FAILURE
} from "./action"


const initialState = {
  users: [],
  loading: false,
  message: null,
  oneUserLoading: false
}

export const registrationRequestState = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOT_CONFIRM_USERS_REQUEST: {
      return {
        ...state,
        loading: true,
        message: null,
        users: []
      }
    }
    case GET_NOT_CONFIRM_USERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        users: action.payload
      }
    }
    case GET_NOT_CONFIRM_USERS_FAILURE: {
      return {
        ...state,
        loading: false,
        message: action.payload
      }
    }
    case CLEAR_MESSAGE: {
      return {
        ...state,
        message: null
      }
    }
    case CONFIRM_USER_REQUEST: {
      return {
        ...state,
        oneUserLoading: action.payload
      }
    }
    case CONFIRM_USER_SUCCESS: {
      return {
        ...state,
        message: action.payload.message,
        users: state.users.filter(user => user._id !== action.payload.id),
        oneUserLoading: ''
      }
    }
    case CONFIRM_USER_FAILURE: {
      return {
        ...state,
        oneUserLoading: '',
        message: action.payload
      }
    }
    case DELETE_NOT_CONFIRM_USER_REQUEST: {
      return {
        ...state,
        oneUserLoading: action.payload
      }
    }
    case DELETE_NOT_CONFIRM_USER_SUCCESS: {
      return {
        ...state,
        oneUserLoading: '',
        users: state.users.filter(user => user._id !== action.payload.id),
        message: action.payload.message
      }
    }
    case DELETE_NOT_CONFIRM_USER_FAILURE: {
      return {
        ...state,
        oneUserLoading: '',
        message: action.payload
      }
    }
    default: return state
  }
}