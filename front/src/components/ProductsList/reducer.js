import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_FAILURE,
  SHOW_ON_WEB_SITE_SUCCESS,
  SHOW_ON_WEB_SITE_REQUEST,
  SHOW_ON_WEB_SITE_FAILURE,
  DEL_PRODUCT_REQUEST,
  DEL_PRODUCT_SUCCESS,
  DEL_PRODUCT_FAILURE
} from "./action";


const initialState = {
  oneProductLoading: '',
  loading: false,
  products: [],
  message: null
}

export const productsState = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return {...state, loading: true, message: null}
    case GET_PRODUCTS_SUCCESS: 
      return {...state, loading: false, products: action.payload}
    case GET_PRODUCTS_FAILURE: 
      return {...state, loading: false, products: [], message: action.payload}
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
    default: 
      return { ...state }
  } 
}