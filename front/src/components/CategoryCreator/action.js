export const ADD_CATEGORY_REQUEST = 'ADD_CATEGORY_REQUEST'
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS'
export const ADD_CATEGORY_FAILURE = 'ADD_CATEGORY_FAILURE'

export const addCategoryRequestAction = (name) => {
  return {
    type: ADD_CATEGORY_REQUEST,
    payload: name
  }
}

export const addCategorySuccessAction = message => {
  return {
    type: ADD_CATEGORY_SUCCESS,
    payload: message
  }
}

export const addCategoryFailureAction = (message) => {
  return {
    type: ADD_CATEGORY_FAILURE,
    payload: message
  }
}
