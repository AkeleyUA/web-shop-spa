import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  DEL_CATEGORY_REQUEST,
  DEL_CATEGORY_SUCCESS,
  DEL_CATEGORY_FAILURE,
  SHOW_CATEGORY_ON_WEB_SITE_REQUEST,
  SHOW_CATEGORY_ON_WEB_SITE_SUCCESS,
  SHOW_CATEGORY_ON_WEB_SITE_FAILURE
} from "./action"



const initialState = {
  categories: [],
  loading: false,
  message: null
}

export const categoriesState = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST: {
      return {
        ...state,
        loading: true,
        message: null
      }
    }
    case GET_CATEGORIES_SUCCESS: {
      return {
        ...state,
        loading: false,
        err: null,
        categories: action.payload,
        message: null
      }
    }
    case GET_CATEGORIES_FAILURE: {
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
        message: action.payload
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
        message: action.payload
      }
    }
    case SHOW_CATEGORY_ON_WEB_SITE_FAILURE: {
      return {
        ...state,
        loading: false,
        message: action.payload
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}