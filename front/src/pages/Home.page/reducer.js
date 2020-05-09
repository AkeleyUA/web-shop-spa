import {
  GET_PRODUCTS_FOR_CLIENT_REQUEST,
  GET_PRODUCTS_FOR_CLIENT_SUCCESS,
  GET_PRODUCTS_FOR_CLIENT_FAILURE,
  GET_CATEGORIES_FOR_CLIENT_REQUEST,
  GET_CATEGORIES_FOR_CLIENT_SUCCESS,
  GET_CATEGORIES_FOR_CLIENT_FAILURE,
  CLEAR_PRODUCTS_MESSAGE
} from "./action"


const initialState = {
  categories: [],
  products: [],
  loadingProducts: false,
  loadingCategories: false,
  message: null,
  productsLength: 0
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
        products: action.payload.products,
        productsLength: action.payload.productsLength,
      }
    }
    case GET_PRODUCTS_FOR_CLIENT_FAILURE: {
      return {
        ...state,
        loadingProducts: false,
        products: [],
        message: action.payload,
        productsLength: 0,
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
    case CLEAR_PRODUCTS_MESSAGE: {
      return {
        ...state,
        message: null
      }
    }
    default: {
      return state
    }
  }
}