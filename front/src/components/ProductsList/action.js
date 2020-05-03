export const GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DEL_PRODUCT = 'DEL_PRODUCT';
export const SHOW_ON_WEB_SITE_REQUEST = 'SHOW_ON_WEB_SITE_REQUEST';
export const SHOW_ON_WEB_SITE_SUCCESS = 'SHOW_ON_WEB_SITE_SUCCESS';
export const SHOW_ON_WEB_SITE_FAILURE = 'SHOW_ON_WEB_SITE_FAILURE';

export const getProductsRequestAction = () => {
  return {
    type: GET_PRODUCTS_REQUEST
  }
}

export const getProductsSuccessAction = (products) => {
  return {
    type: GET_PRODUCTS_SUCCESS,
    payload: products
  }
}

export const getProductsFailureAction = (error) => {
  return {
    type: GET_PRODUCTS_FAILURE,
    payload: error
  }
}

export const showOnWebSiteRequestAction = (id, checked) => {
  return {
    type: SHOW_ON_WEB_SITE_REQUEST,
    payload: {
      id,
      checked
    }
  }
}

export const showOnWebSiteSuccessAction = (products) => {
  return {
    type: SHOW_ON_WEB_SITE_SUCCESS,
    payload: products
  }
}

export const showOnWebSiteFailureAction = (err) => {
  return {
    type: SHOW_ON_WEB_SITE_FAILURE,
    payload: err
  }
}