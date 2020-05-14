import { ADD_CATEGORY_REQUEST, ADD_CATEGORY_SUCCESS, ADD_CATEGORY_FAILURE, CLEAR_MESSAGE } from "./action"


const initialState = {
  loading: false,
  message: null,
  success: false
}

export const categoryCreatorState = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY_REQUEST: {
      return {
        ...state,
        loading: true,
        message: null,
        success: false
      }
    }
    case ADD_CATEGORY_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: action.payload,
        success: true
      }
    }
    case ADD_CATEGORY_FAILURE: {
      return {
        ...state,
        loading: false,
        message: action.payload,
        success: false
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