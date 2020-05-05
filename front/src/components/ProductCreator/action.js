export const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST'
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS'
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE'
export const CLEAR_FORM = 'CLEAR_FORM'

export const addProductRequestAction = form => {
  return {
    type: ADD_PRODUCT_REQUEST,
    payload: form
  }
}

export const addProductSuccessAction = message => {
  return {
    type: ADD_PRODUCT_SUCCESS,
    payload: message
  }
}

export const addProductFailureAction = message => {
  return {
    type: ADD_PRODUCT_FAILURE,
    payload: message
  }
}

export const formCleanerAction = status => {
  return {
    type: CLEAR_FORM,
    payload: status
  }
}