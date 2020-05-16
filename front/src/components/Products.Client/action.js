export const GET_PRODUCTS_FOR_CLIENT_REQUEST = 'GET_PRODUCTS_FOR_CLIENT_REQUEST'
export const GET_PRODUCTS_FOR_CLIENT_SUCCESS = 'GET_PRODUCTS_FOR_CLIENT_SUCCESS'
export const GET_PRODUCTS_FOR_CLIENT_FAILURE = 'GET_PRODUCTS_FOR_CLIENT_FAILURE'
export const SEARCH_PRODUCT_FOR_CLIENT_REQUEST = 'SEARCH_PRODUCT_FOR_CLIENT_REQUEST'
export const SEARCH_PRODUCT_FOR_CLIENT_SUCCESS = 'SEARCH_PRODUCT_FOR_CLIENT_SUCCESS'
export const SEARCH_PRODUCT_FOR_CLIENT_FAILURE = 'SEARCH_PRODUCT_FOR_CLIENT_FAILURE'
export const GET_POPULAR_PRODUCTS_REQUEST = 'GET_POPULAR_PRODUCTS_REQUEST'
export const GET_POPULAR_PRODUCTS_SUCCESS = 'GET_POPULAR_PRODUCTS_SUCCESS'
export const GET_POPULAR_PRODUCTS_FAILURE = 'GET_POPULAR_PRODUCTS_FAILURE'
export const GET_BEST_PRICE_PRODUCTS_REQUEST = 'GET_BEST_PRICE_PRODUCTS_REQUEST'
export const GET_BEST_PRICE_PRODUCTS_SUCCESS = 'GET_BEST_PRICE_PRODUCTS_SUCCESS'
export const GET_BEST_PRICE_PRODUCTS_FAILURE = 'GET_BEST_PRICE_PRODUCTS_FAILURE'

export const CLEAR_MESSAGE = 'CLEAR_MESSAGE'
export const CHANGE_CURRENT_PAGE = 'CHENGE_CURRENT_PAGE'



export const getProductsForClientRequestAction = (category, limit, page, filter) => {
  return {
    type: GET_PRODUCTS_FOR_CLIENT_REQUEST,
    payload: {
      category,
      limit,
      page,
      filter
    }
  }
}

export const getProductsForClientSuccessAction = (products, productsLength) => {
  return {
    type: GET_PRODUCTS_FOR_CLIENT_SUCCESS,
    payload: {
      products,
      productsLength
    }
  }
}

export const getProductsForClientFailureAction = message => {
  return {
    type: GET_PRODUCTS_FOR_CLIENT_FAILURE,
    payload: message
  }
}

export const clearMessageAction = () => {
  return {
    type: CLEAR_MESSAGE
  }
}

export const changeCurrentPageAction = page => {
  return {
    type: CHANGE_CURRENT_PAGE,
    payload: page
  }
}

export const searchProductForClientRequestAction = value => {
  return {
    type: SEARCH_PRODUCT_FOR_CLIENT_REQUEST,
    payload: value
  }
}

export const searchProductForClientSuccessAction = (products, productsLength) => {
  return {
    type: SEARCH_PRODUCT_FOR_CLIENT_SUCCESS,
    payload: {
      products,
      productsLength
    }
  }
}

export const searchProductForClientFailureAction = value => {
  return {
    type: SEARCH_PRODUCT_FOR_CLIENT_FAILURE,
    payload: value
  }
}

export const getPopularProductsRequestAction = () => {
  return {
    type: GET_POPULAR_PRODUCTS_REQUEST
  }
}

export const getPopularProductsSuccessAction = (products, productsLength) => {
  return {
    type: GET_POPULAR_PRODUCTS_SUCCESS,
    payload: { products, productsLength }
  }
}

export const getPopularProductsFailureAction = message => {
  return {
    type: GET_POPULAR_PRODUCTS_REQUEST,
    payload: message
  }
}