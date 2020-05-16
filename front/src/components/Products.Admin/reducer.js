import {
  SHOW_ON_WEB_SITE_SUCCESS,
  SHOW_ON_WEB_SITE_REQUEST,
  SHOW_ON_WEB_SITE_FAILURE,
  DEL_PRODUCT_REQUEST,
  DEL_PRODUCT_SUCCESS,
  DEL_PRODUCT_FAILURE,
  GET_PRODUCTS_FOR_ADMIN_REQUEST,
  GET_PRODUCTS_FOR_ADMIN_SUCCESS,
  GET_PRODUCTS_FOR_ADMIN_FAILURE,
  CHANGE_CURRENT_PAGE,
  SEARCH_PRODUCT_FOR_ADMIN_REQUEST,
  SEARCH_PRODUCT_FOR_ADMIN_SUCCESS,
  SEARCH_PRODUCT_FOR_ADMIN_FAILURE,
  CLEAR_MESSAGE,
  SHOW_ON_POPULAR_REQUEST,
  SHOW_ON_POPULAR_SUCCESS,
  SHOW_ON_POPULAR_FAILURE
} from "./action"
import { CHANGE_SEARCH_VALUE } from "../ProductsFilter/action"


const initialState = {
  oneProductLoading: '',
  loading: false,
  products: [],
  message: null,
  currentPage: 1,
  productsLength: 0,
  search: null
}

export const adminProductsState = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_FOR_ADMIN_REQUEST:
      return {
        ...state,
        loading: true,
        message: null,
        products: [],
        search: null,
        productsLength: 0
      }
    case GET_PRODUCTS_FOR_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        productsLength: action.payload.productsLength,
      }
    case GET_PRODUCTS_FOR_ADMIN_FAILURE:
      return {
        ...state,
        loading: false,
        products: [],
        message: action.payload,
        productsLength: 0
      }
    case SEARCH_PRODUCT_FOR_ADMIN_REQUEST: {
      return {
        ...state,
        products: [],
        loading: true,
        message: null,
        productsLength: 0,
        search: action.payload
      }
    }
    case SEARCH_PRODUCT_FOR_ADMIN_SUCCESS: {
      return {
        ...state,
        products: action.payload.products,
        productsLength: action.payload.productsLength,
        loading: false,
      }
    }
    case SEARCH_PRODUCT_FOR_ADMIN_FAILURE: {
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
    case SHOW_ON_WEB_SITE_REQUEST:
      return {
        ...state,
        oneProductLoading:
          action.payload.id,
        message: null
      }
    case SHOW_ON_WEB_SITE_SUCCESS:
      return {
        ...state,
        oneProductLoading: '',
        message: action.payload.message,
        products: state.products.map(product => {
          if (product._id === action.payload.id) {
            return { ...product, show: !product.show }
          }
          else {
            return product
          }
        })
      }
    case SHOW_ON_WEB_SITE_FAILURE:
      return {
        ...state,
        oneProductLoading: '',
        message: action.payload
      }
    case DEL_PRODUCT_REQUEST:
      return {
        ...state,
        oneProductLoading: action.payload.id,
        message: null
      }
    case DEL_PRODUCT_SUCCESS:
      return {
        ...state,
        oneProductLoading: '',
        message: action.payload.message,
        products: state.products.filter(product => product._id !== action.payload.id)
      }
    case DEL_PRODUCT_FAILURE:
      return {
        ...state,
        oneProductLoading: '',
        message: action.payload
      }
    case CHANGE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      }
    case CLEAR_MESSAGE: {
      return {
        ...state,
        message: null
      }
    }
    case SHOW_ON_POPULAR_REQUEST: {
      return {
        ...state,
        oneProductLoading: action.payload.id
      }
    }
    case SHOW_ON_POPULAR_SUCCESS: {
      return {
        ...state,
        oneProductLoading: '',
        products: state.products.map(product => {
          if (product._id === action.payload.id) {
            return { ...product, popular: !product.popular }
          }
          return product
        }),
        message: action.payload.message
      }
    }
    case SHOW_ON_POPULAR_FAILURE: {
      return {
        ...state,
        oneProductLoading: '',
        message: action.payload
      }
    }
    default: return state
  }
}