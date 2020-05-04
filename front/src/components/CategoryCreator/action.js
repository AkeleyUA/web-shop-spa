export const ADD_CATEGORY_REQUEST = 'ADD_CATEGORY_REQUEST'
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS'
export const ADD_CATEGORY_FAILURE = 'ADD_CATEGORY_FAILURE'

export const addCategoryRequestAction = (name) => {
  return {
    type: ADD_CATEGORY_REQUEST,
    payload: name
  }
}

export const addCategorySuccessAction = () => {
  return {
    type: ADD_CATEGORY_SUCCESS
  }
}

export const addCategoryFailureAction = (err) => {
  return {
    type: ADD_CATEGORY_FAILURE,
    payload: err
  }
}
