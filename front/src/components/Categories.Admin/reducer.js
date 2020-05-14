import {
  GET_CATEGORIES_FOR_ADMIN_REQUEST,
  GET_CATEGORIES_FOR_ADMIN_SUCCESS,
  GET_CATEGORIES_FOR_ADMIN_FAILURE,
  DEL_CATEGORY_REQUEST,
  DEL_CATEGORY_SUCCESS,
  DEL_CATEGORY_FAILURE,
  SHOW_CATEGORY_ON_WEB_SITE_REQUEST,
  SHOW_CATEGORY_ON_WEB_SITE_SUCCESS,
  SHOW_CATEGORY_ON_WEB_SITE_FAILURE,
  CLEAR_MESSAGE
} from "./action"



const initialState = {
  categories: [],
  loading: false,
  message: null
}

export const adminCategoriesState = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES_FOR_ADMIN_REQUEST: {
      return {
        ...state,
        loading: true,
        message: null
      }
    }
    case GET_CATEGORIES_FOR_ADMIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        err: null,
        categories: action.payload,
        message: null
      }
    }
    case GET_CATEGORIES_FOR_ADMIN_FAILURE: {
      return {
        ...state,
        loading: false,
        message: action.payload,
      }
    }
    case DEL_CATEGORY_REQUEST: {
      return {
        ...state,
        loading: true,
        message: null
      }
    }
    case DEL_CATEGORY_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        categories: state.categories.filter(category => category._id !== action.payload.id)
      }
    }
    case DEL_CATEGORY_FAILURE: {
      return {
        ...state,
        loading: false,
        message: action.payload
      }
    }
    case SHOW_CATEGORY_ON_WEB_SITE_REQUEST: {
      return {
        ...state,
        loading: true,
        message: null
      }
    }
    case SHOW_CATEGORY_ON_WEB_SITE_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        categories: state.categories.map(category => {
          if(category._id === action.payload.id) {
            return {...category, show: !category.show}
          } else {
            return category
          }
        })
      }
    }
    case SHOW_CATEGORY_ON_WEB_SITE_FAILURE: {
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