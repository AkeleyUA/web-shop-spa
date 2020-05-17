import {
  GET_PRODUCT_FOR_EDIT_REQUEST,
  GET_PRODUCT_FOR_EDIT_SUCCESS,
  GET_PRODUCT_FOR_EDIT_FALURE,
  CLEAR_MESSAGE,
  SAVE_CHANGE_PRODUCT_REQUEST,
  SAVE_CHANGE_PRODUCT_SUCCESS,
  SAVE_CHANGE_PRODUCT_FAILURE
} from "./action"

const initialState = {
  product: {},
  loading: false,
  message: null
}

export const editState = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_FOR_EDIT_REQUEST: {
      return {
        ...state,
        loading: true,
        product: {}
      }
    }
    case GET_PRODUCT_FOR_EDIT_SUCCESS: {
      return {
        ...state,
        loading: false,
        product: action.payload
      }
    }
    case GET_PRODUCT_FOR_EDIT_FALURE: {
      return {
        ...state,
        loading: false,
        message: action.payload,
        product: {}
      }
    }
    case SAVE_CHANGE_PRODUCT_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }
    case SAVE_CHANGE_PRODUCT_SUCCESS: {
      return {
        ...state,
        loading: false,
        product: action.payload.product,
        message: action.payload.message
      }
    }
    case SAVE_CHANGE_PRODUCT_FAILURE: {
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
    default: return state
  }
}