import { ADD_CATEGORY_REQUEST, ADD_CATEGORY_SUCCESS, ADD_CATEGORY_FAILURE } from "./action"


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
    default:
      return { ...state }
  }
}