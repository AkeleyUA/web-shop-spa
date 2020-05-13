import { GET_PRODUCT_FOR_EDIT_REQUEST, GET_PRODUCT_FOR_EDIT_SUCCESS, GET_PRODUCT_FOR_EDIT_FALURE, CLEAR_MESSAGE } from "./action"

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
    case CLEAR_MESSAGE: {
      return {
        ...state,
        message: null
      }
    }
    default: return state
  }
}