export const GET_PRODUCTS_FOR_CLIENT_REQUEST = 'GET_PRODUCTS_FOR_CLIENT_REQUEST'
export const GET_PRODUCTS_FOR_CLIENT_SUCCESS = 'GET_PRODUCTS_FOR_CLIENT_SUCCESS'
export const GET_PRODUCTS_FOR_CLIENT_FAILURE = 'GET_PRODUCTS_FOR_CLIENT_FAILURE'
export const GET_CATEGORIES_FOR_CLIENT_REQUEST ='GET_CATEGORIES_FOR_CLIENT_REQUEST'
export const GET_CATEGORIES_FOR_CLIENT_SUCCESS ='GET_CATEGORIES_FOR_CLIENT_SUCCESS'
export const GET_CATEGORIES_FOR_CLIENT_FAILURE ='GET_CATEGORIES_FOR_CLIENT_FAILURE'


export const getProductsForClientRequestAction = category => {
  return {
    type: GET_PRODUCTS_FOR_CLIENT_REQUEST,
    payload: category
  }
}

export const getProductsForClientSuccessAction = products => {
  return {
    type: GET_PRODUCTS_FOR_CLIENT_SUCCESS,
    payload: products
  }
}

export const getProductsForClientFailreAction = message => {
  return {
    type: GET_PRODUCTS_FOR_CLIENT_FAILURE,
    payload: message 
  }
}

export const getCategoriesForClientRequestAction = () => {
  return {
    type: GET_CATEGORIES_FOR_CLIENT_REQUEST
  }
}

export const getCategoriesForClientSuccessAction = categories => {
  return {
    type: GET_CATEGORIES_FOR_CLIENT_SUCCESS,
    payload: categories
  }
}

export const getCategoriesForClientFailureAction = message => {
  return {
    type: GET_CATEGORIES_FOR_CLIENT_FAILURE,
    payload: message
  }
}