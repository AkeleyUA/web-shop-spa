import { ADD_PRODUCT_FAILURE, ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, CLEAR_FORM } from "./action"


const initialState = {
  loading: false,
  message: null,
  success: false
}

export const productCreatorState = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_REQUEST: {
      return {
        ...state,
        loading: true,
        message: null
      }
    }
    case ADD_PRODUCT_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: action.payload,
        success: true,
      }
    }
    case ADD_PRODUCT_FAILURE: {
      return {
        ...state,
        loading: false,
        message: action.payload
      }
    }
    case CLEAR_FORM: {
      return {
        ...state,
        success: action.status
      }
    }
    default:
      return { ...state }
  }
}