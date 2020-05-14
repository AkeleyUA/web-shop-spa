import {
  GET_PRODUCTS_FOR_CLIENT_REQUEST,
  GET_PRODUCTS_FOR_CLIENT_SUCCESS,
  GET_PRODUCTS_FOR_CLIENT_FAILURE,
  CHANGE_CURRENT_PAGE,
  SEARCH_PRODUCT_FOR_CLIENT_REQUEST,
  SEARCH_PRODUCT_FOR_CLIENT_SUCCESS,
  SEARCH_PRODUCT_FOR_CLIENT_FAILURE,
  CLEAR_MESSAGE
} from "./action"
import { CHANGE_SEARCH_VALUE } from "../ProductsFilter/action"


const initialState = {
  products: [],
  loading: false,
  message: null,
  productsLength: 0,
  currentPage: 1,
  search: null
}

export const clientProductsState = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_FOR_CLIENT_REQUEST: {
      return {
        ...state,
        loading: true,
        products: [],
        message: null,
        productsLength: 0
      }
    }
    case GET_PRODUCTS_FOR_CLIENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        message: null,
        productsLength: action.payload.productsLength
      }
    }
    case GET_PRODUCTS_FOR_CLIENT_FAILURE: {
      return {
        ...state,
        loading: false,
        products: [],
        message: action.payload,
        productsLength: 0
      }
    }
    case CHANGE_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.payload
      }
    }
    case SEARCH_PRODUCT_FOR_CLIENT_REQUEST: {
      return {
        ...state,
        products: [],
        loading: true,
        message: null,
        productsLength: 0,
        search: action.payload
      }
    }
    case SEARCH_PRODUCT_FOR_CLIENT_SUCCESS: {
      return {
        ...state,
        products: action.payload.products,
        productsLength: action.payload.productsLength,
        loading: false,
      }
    }
    case SEARCH_PRODUCT_FOR_CLIENT_FAILURE: {
      return {
        ...state,
        loading: false,
        message: action.payload
      }
    }
    case CHANGE_SEARCH_VALUE: {
      return {
        ...state,
        search: action.payload
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