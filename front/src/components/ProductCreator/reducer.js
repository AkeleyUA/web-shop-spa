import { ADD_PRODUCT_FAILURE, ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, CLEAR_MESSAGE } from "./action"


const initialState = {
  loading: false,
  message: null,
}

export const productCreatorState = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }
    case ADD_PRODUCT_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: action.payload
      }
    }
    case ADD_PRODUCT_FAILURE: {
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