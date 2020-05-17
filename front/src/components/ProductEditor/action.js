export const GET_PRODUCT_FOR_EDIT_REQUEST = 'GET_PRODUCT_FOR_EDIT_REQUEST'
export const GET_PRODUCT_FOR_EDIT_SUCCESS = 'GET_PRODUCT_FOR_EDIT_SUCCESS'
export const GET_PRODUCT_FOR_EDIT_FALURE = 'GET_PRODUCT_FOR_EDIT_FALURE'
export const SAVE_CHANGE_PRODUCT_REQUEST = 'SAVE_CHANGE_PRODUCT_REQUEST'
export const SAVE_CHANGE_PRODUCT_SUCCESS = 'SAVE_CHANGE_PRODUCT_SUCCESS'
export const SAVE_CHANGE_PRODUCT_FAILURE = 'SAVE_CHANGE_PRODUCT_FAILURE'
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE'

export const getProductForEditRequestAction = id => {
  return {
    type: GET_PRODUCT_FOR_EDIT_REQUEST,
    payload: id
  }
}

export const getProductForEditSuccessAction = product => {
  return {
    type: GET_PRODUCT_FOR_EDIT_SUCCESS,
    payload: product
  }
}

export const getProductForEditFalureAction = message => {
  return {
    type: GET_PRODUCT_FOR_EDIT_FALURE,
    payload: message
  }
}

export const saveChangeProductRequestAction = (form, id) => {
  return {
    type: SAVE_CHANGE_PRODUCT_REQUEST,
    payload: {
      form,
      id
    }
  }
}

export const saveChangeProductSuccessAction = (product, message) => {
  return {
    type: SAVE_CHANGE_PRODUCT_SUCCESS,
    payload: { product, message }
  }
}

export const saveChangeProductFailureAction = message => {
  return {
    type: SAVE_CHANGE_PRODUCT_FAILURE,
    payload: message
  }
}

export const clearMessageAction = () => {
  return {
    type: CLEAR_MESSAGE
  }
}