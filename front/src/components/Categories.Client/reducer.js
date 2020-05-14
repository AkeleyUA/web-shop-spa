import {
  SET_CURRENT_CATEGORY,
  GET_CATEGORIES_FOR_CLIENT_REQUEST,
  GET_CATEGORIES_FOR_CLIENT_SUCCESS,
  GET_CATEGORIES_FOR_CLIENT_FAILURE,
  CLEAR_MESSAGE
} from "./action"

const initialState = {
  categories: [],
  loading: false,
  message: null,
  currentCategory: 'Все'
}

export const clientCategoriesState = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_CATEGORY: {
      return {
        ...state,
        currentCategory: action.payload
      }
    }
    case GET_CATEGORIES_FOR_CLIENT_REQUEST: {
      return {
        ...state,
        loading: true,
        message: null,
        categories: []
      }
    }
    case GET_CATEGORIES_FOR_CLIENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        categories: action.payload,
        message: null,
      }
    }
    case GET_CATEGORIES_FOR_CLIENT_FAILURE: {
      return {
        ...state,
        loading: false,
        categories: [],
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
