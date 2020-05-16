import {
  GET_USERS_FOR_ADMIN_REQUEST,
  GET_USERS_FOR_ADMIN_SUCCESS,
  GET_USERS_FOR_ADMIN_FAILURE,
  CLEAR_MESSAGE,
  CHANGE_LEVEL_REQUEST,
  CHANGE_LEVEL_SUCCESS,
  CHANGE_LEVEL_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE
} from "./action"


const inititalState = {
  loading: false,
  users: [],
  message: null,
  oneUserLoading: ''
}

export const accessState = (state = inititalState, action) => {
  switch (action.type) {
    case GET_USERS_FOR_ADMIN_REQUEST: {
      return {
        ...state,
        loading: true,
        message: null,
        users: []
      }
    }
    case GET_USERS_FOR_ADMIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: null,
        users: action.payload
      }
    }
    case GET_USERS_FOR_ADMIN_FAILURE: {
      return {
        ...state,
        loading: false,
        message: action.payload,
      }
    }
    case CLEAR_MESSAGE: {
      return {
        ...state,
        message: null
      }
    }
    case CHANGE_LEVEL_REQUEST: {
      return {
        ...state,
        oneUserLoading: action.payload
      }
    }
    case CHANGE_LEVEL_SUCCESS: {
      return {
        ...state,
        oneUserLoading: '',
        users: state.users.map(user => {
          if(user._id === action.payload.id) {
            return {...user, accessLevel: action.payload.level}
          }
          return user
        }),
        message: action.payload.message
      }
    }
    case CHANGE_LEVEL_FAILURE: {
      return {
        ...state,
        oneUserLoading: '',
        message: action.payload
      }
    }
    case DELETE_USER_REQUEST: {
      return {
        ...state,
        oneUserLoading: action.payload,
      }
    }
    case DELETE_USER_SUCCESS: {
      return {
        ...state,
        oneUserLoading: '',
        users: state.users.filter(user => user._id !== action.payload.id),
        message: action.payload.message
      }
    }
    case DELETE_USER_FAILURE: {
      return {
        ...state,
        oneUserLoading: '',
        message: action.payload
      }
    }
    default: return state
  }
}