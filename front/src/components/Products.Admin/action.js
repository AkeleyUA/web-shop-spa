export const GET_PRODUCTS_FOR_ADMIN_REQUEST = 'GET_PRODUCTS_FOR_ADMIN_REQUEST'
export const GET_PRODUCTS_FOR_ADMIN_SUCCESS = 'GET_PRODUCTS_FOR_ADMIN_SUCCESS'
export const GET_PRODUCTS_FOR_ADMIN_FAILURE = 'GET_PRODUCTS_FOR_ADMIN_FAILURE'
export const CHANGE_CURRENT_PAGE = 'CHANGE_CURRENT_PAGE'
export const SEARCH_PRODUCT_FOR_ADMIN_REQUEST = 'SEARCH_PRODUCT_FOR_ADMIN_REQUEST'
export const SEARCH_PRODUCT_FOR_ADMIN_SUCCESS = 'SEARCH_PRODUCT_FOR_ADMIN_SUCCESS'
export const SEARCH_PRODUCT_FOR_ADMIN_FAILURE = 'SEARCH_PRODUCT_FOR_ADMIN_FAILURE'
export const DEL_PRODUCT_REQUEST = 'DEL_PRODUCT_REQUEST'
export const DEL_PRODUCT_SUCCESS = 'DEL_PRODUCT_SUCCESS'
export const DEL_PRODUCT_FAILURE = 'DEL_PRODUCT_FAILURE'
export const SHOW_ON_WEB_SITE_REQUEST = 'SHOW_ON_WEB_SITE_REQUEST'
export const SHOW_ON_WEB_SITE_SUCCESS = 'SHOW_ON_WEB_SITE_SUCCESS'
export const SHOW_ON_WEB_SITE_FAILURE = 'SHOW_ON_WEB_SITE_FAILURE'
export const SHOW_ON_POPULAR_REQUEST = 'SHOW_ON_POPULAR_REQUEST'
export const SHOW_ON_POPULAR_SUCCESS = 'SHOW_ON_POPULAR_SUCCESS'
export const SHOW_ON_POPULAR_FAILURE = 'SHOW_ON_POPULAR_FAILURE'
export const CHANGE_PAGE = 'CHANGE_PAGE'
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE'

export const getProductsForAdminRequestAction = (limit, page) => {
  return {
    type: GET_PRODUCTS_FOR_ADMIN_REQUEST,
    payload: {
      limit,
      page
    }
  }
}

export const getProductsForAdminSuccessAction = (products, productsLength) => {
  return {
    type: GET_PRODUCTS_FOR_ADMIN_SUCCESS,
    payload: {
      products,
      productsLength
    }
  }
}

export const getProductsForAdminFailureAction = message => {
  return {
    type: GET_PRODUCTS_FOR_ADMIN_FAILURE,
    payload: message
  }
}

export const searchProductForAdminRequestAction = value => {
  return {
    type: SEARCH_PRODUCT_FOR_ADMIN_REQUEST,
    payload: value
  }
}

export const searchProductForAdminSuccessAction = (products, productsLength) => {
  return {
    type: SEARCH_PRODUCT_FOR_ADMIN_SUCCESS,
    payload: {
      products,
      productsLength
    }
  }
}

export const searchProductForAdminFailureAction = value => {
  return {
    type: SEARCH_PRODUCT_FOR_ADMIN_FAILURE,
    payload: value
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

export const showOnWebSiteSuccessAction = (message, id) => {
  return {
    type: SHOW_ON_WEB_SITE_SUCCESS,
    payload: {
      message,
      id
    }
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

export const deleteProductSuccessAction = (message, id) => {
  return {
    type: DEL_PRODUCT_SUCCESS,
    payload: {
      message,
      id
    }
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
    type: CHANGE_CURRENT_PAGE,
    payload: page
  }
}

export const showOnPopularRequestAction = (id, checked) => {
  return {
    type: SHOW_ON_POPULAR_REQUEST,
    payload: {
      id,
      checked
    }
  }
}

export const showOnPopularSuccessAction = (id, message) => {
  return {
    type: SHOW_ON_POPULAR_SUCCESS,
    payload: { id, message }
  }
}

export const showOnPopularFailureAction = message => {
  return {
    type: SHOW_ON_POPULAR_FAILURE,
    payload: message
  }
}

export const clearMessage = () => {
  return {
    type: CLEAR_MESSAGE
  }
}