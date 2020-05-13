import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_FAILURE,
  SHOW_ON_WEB_SITE_SUCCESS,
  SHOW_ON_WEB_SITE_REQUEST,
  SHOW_ON_WEB_SITE_FAILURE,
  DEL_PRODUCT_REQUEST,
  DEL_PRODUCT_SUCCESS,
  DEL_PRODUCT_FAILURE,
  CHANGE_PAGE
} from "./action";


const initialState = {
  oneProductLoading: '',
  loading: false,
  products: [],
  message: null,
  currentPage: 1,
  productsLength: 0
}

export const productsState = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return {...state, loading: true, message: null}
    case GET_PRODUCTS_SUCCESS: 
      return {...state, loading: false, products: action.payload.products, productsLength: action.payload.productsLength}
    case GET_PRODUCTS_FAILURE: 
      return {...state, loading: false, products: [], message: action.payload, productsLength: 0}
    case SHOW_ON_WEB_SITE_REQUEST: 
      return {...state, oneProductLoading: action.payload.id, message: null}
    case SHOW_ON_WEB_SITE_SUCCESS: 
      return {...state, oneProductLoading: '', message: action.payload}
    case SHOW_ON_WEB_SITE_FAILURE: 
      return {...state, oneProductLoading: '', message: action.payload}
    case DEL_PRODUCT_REQUEST:
      return {...state, oneProductLoading: action.payload.id, message: null}
    case DEL_PRODUCT_SUCCESS: 
      return {...state, oneProductLoading: '', message: action.payload}
    case DEL_PRODUCT_FAILURE: 
      return {...state, oneProductLoading: '', message: action.payload}
    case CHANGE_PAGE: 
      return {...state, currentPage: action.payload}
    default: 
      return { ...state }
  } 
}