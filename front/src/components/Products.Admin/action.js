export const GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST'
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS'
export const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE'
export const DEL_PRODUCT_REQUEST = 'DEL_PRODUCT_REQUEST'
export const DEL_PRODUCT_SUCCESS = 'DEL_PRODUCT_SUCCESS'
export const DEL_PRODUCT_FAILURE = 'DEL_PRODUCT_FAILURE'
export const SHOW_ON_WEB_SITE_REQUEST = 'SHOW_ON_WEB_SITE_REQUEST'
export const SHOW_ON_WEB_SITE_SUCCESS = 'SHOW_ON_WEB_SITE_SUCCESS'
export const SHOW_ON_WEB_SITE_FAILURE = 'SHOW_ON_WEB_SITE_FAILURE'
export const CHANGE_PAGE = 'CHANGE_PAGE'

export const getProductsRequestAction = (limit, page) => {
  return {
    type: GET_PRODUCTS_REQUEST,
    payload: {
      limit,
      page
    }
  }
}

export const getProductsSuccessAction = (products, productsLength) => {
  return {
    type: GET_PRODUCTS_SUCCESS,
    payload: {
      products,
      productsLength
    }
  }
}

export const getProductsFailureAction = message => {
  return {
    type: GET_PRODUCTS_FAILURE,
    payload: message
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

export const showOnWebSiteSuccessAction = message => {
  return {
    type: SHOW_ON_WEB_SITE_SUCCESS,
    payload: message
  }
}

export const showOnWebSiteFailureAction = message => {
  return {
    type: SHOW_ON_WEB_SITE_FAILURE,
    payload: message
  }
}

export const deleteProductRequestAction = id => {
  return {
    type: DEL_PRODUCT_REQUEST,
    payload: id
  }
}

export const deleteProductSuccessAction = message => {
  return {
    type: DEL_PRODUCT_SUCCESS,
    payload: message
  }
}

export const deleteProductFailureAction = message => {
  return {
    type: DEL_PRODUCT_FAILURE,
    payload: message
  }
}

export const changePageAction = page => {
  return {
    type: CHANGE_PAGE,
    payload: page
  }
}