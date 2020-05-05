import {
  GET_PRODUCTS_FOR_CLIENT_REQUEST,
  GET_PRODUCTS_FOR_CLIENT_SUCCESS,
  GET_PRODUCTS_FOR_CLIENT_FAILURE,
  GET_CATEGORIES_FOR_CLIENT_REQUEST,
  GET_CATEGORIES_FOR_CLIENT_SUCCESS,
  GET_CATEGORIES_FOR_CLIENT_FAILURE
} from "./action"


const initialState = {
  categories: [],
  products: [],
  loadingProducts: false,
  loadingCategories: false,
  message: null
}

export const forClientState = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_FOR_CLIENT_REQUEST: {
      return {
        ...state,
        loadingProducts: true,
        message: null,
        products: []
      }
    }
    case GET_PRODUCTS_FOR_CLIENT_SUCCESS: {
      return {
        ...state,
        loadingProducts: false,
        message: null,
        products: action.payload
      }
    }
    case GET_PRODUCTS_FOR_CLIENT_FAILURE: {
      return {
        ...state,
        loadingProducts: false,
        message: action.payload,
        products: []
      }
    }
    case GET_CATEGORIES_FOR_CLIENT_REQUEST: {
      return {
        ...state,
        loadingCategories: true,
        message: null,
        categories: []
      }
    }
    case GET_CATEGORIES_FOR_CLIENT_SUCCESS: {
      return {
        ...state,
        loadingCategories: false,
        categories: action.payload,
        message: null,
      }
    }
    case GET_CATEGORIES_FOR_CLIENT_FAILURE: {
      return {
        ...state,
        loadingCategories: false,
        categories: [],
        message: action.payload
      }
    }
    default: {
      return state
    }
  }
}