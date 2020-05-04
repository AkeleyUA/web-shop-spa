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
  error: ''
}

export const productsState = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return {...state, loading: true, error: null}
    case GET_PRODUCTS_SUCCESS: 
      return {...state, loading: false, products: action.payload}
    case GET_PRODUCTS_FAILURE: 
      return {...state, loading: false, products: [], error: action.payload}
    case SHOW_ON_WEB_SITE_REQUEST: 
      return {...state, oneProductLoading: action.payload.id, error: null}
    case SHOW_ON_WEB_SITE_SUCCESS: 
      return {...state, oneProductLoading: '', error: null, products: action.payload}
    case SHOW_ON_WEB_SITE_FAILURE: 
      return {...state, oneProductLoading: '', error: action.payload}
    case DEL_PRODUCT_REQUEST:
      return {...state, oneProductLoading: action.payload.id, error: null}
    case DEL_PRODUCT_SUCCESS: 
      return {...state, oneProductLoading: '', error: null, products: action.payload}
    case DEL_PRODUCT_FAILURE: 
      return {...state, oneProductLoading: '', error: action.payload}
    default: 
      return { ...state }
  } 
}