export const GET_CATEGORIES_FOR_CLIENT_REQUEST ='GET_CATEGORIES_FOR_CLIENT_REQUEST'
export const GET_CATEGORIES_FOR_CLIENT_SUCCESS ='GET_CATEGORIES_FOR_CLIENT_SUCCESS'
export const GET_CATEGORIES_FOR_CLIENT_FAILURE ='GET_CATEGORIES_FOR_CLIENT_FAILURE'

export const CLEAR_MESSAGE = 'CLEAR_MESSAGE'
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY'


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

export const clearMessageAction = () => {
  return {
    type: CLEAR_MESSAGE
  }
}

export const setCurrentCategoryAction = category => {
  return {
    type: SET_CURRENT_CATEGORY,
    payload: category
  }
}