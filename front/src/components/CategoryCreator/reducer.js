import { ADD_CATEGORY_REQUEST, ADD_CATEGORY_SUCCESS, ADD_CATEGORY_FAILURE } from "./action"


const initialState = {
  loading: false,
  err: null,
  success: false
}

export const categoryCreatorState = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY_REQUEST: {
      return {
        ...state,
        loading: true,
        err: null,
        success: false,
      }
    }
    case ADD_CATEGORY_SUCCESS: {
      return {
        ...state,
        loading: false,
        err: null,
        success: true,
      }
    }
    case ADD_CATEGORY_FAILURE: {
      return {
        ...state,
        loading: false,
        err: action.payload,
        success: false
      }
    }
    default:
      return { ...state }
  }
}