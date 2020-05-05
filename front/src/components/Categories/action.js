export const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAILURE = 'GET_CATEGORIES_FAILURE';
export const DEL_CATEGORY_REQUEST = 'DEL_CATEGORY_REQUEST';
export const DEL_CATEGORY_SUCCESS = 'DEL_CATEGORY_SUCCESS';
export const DEL_CATEGORY_FAILURE = 'DEL_CATEGORY_FAILURE';
export const SHOW_CATEGORY_ON_WEB_SITE_REQUEST = 'SHOW_CATEGORY_ON_WEB_SITE_REQUEST';
export const SHOW_CATEGORY_ON_WEB_SITE_SUCCESS = 'SHOW_CATEGORY_ON_WEB_SITE_SUCCESS';
export const SHOW_CATEGORY_ON_WEB_SITE_FAILURE = 'SHOW_CATEGORY_ON_WEB_SITE_FAILURE';

export const getCategoryRequestAction = () => {
  return {
    type: GET_CATEGORIES_REQUEST
  }
}
export const getCategorySuccessAction = categories => {
  return {
    type: GET_CATEGORIES_SUCCESS,
    payload: categories
  }
}
export const getCategoryFailureAction = message => {
  return {
    type: GET_CATEGORIES_FAILURE,
    payload: message
  }
}

export const deleteCategoryRequestAction = id => {
  return {
    type: DEL_CATEGORY_REQUEST,
    payload: id
  }
}

export const deleteCategorySuccessAction = message => {
  return {
    type: DEL_CATEGORY_SUCCESS,
    payload: message
  }
}

export const deleteCategoryFailureAction = message => {
  return {
    type: DEL_CATEGORY_FAILURE,
    payload: message
  }
}

export const showCategoryOnWebSiteRequestAction = (id, checked) => {
  return {
    type: SHOW_CATEGORY_ON_WEB_SITE_REQUEST,
    payload: {
      id,
      checked
    }
  }
}

export const showCategoryOnWebSiteSuccessAction = message => {
  return {
    type: SHOW_CATEGORY_ON_WEB_SITE_SUCCESS,
    payload: message
  }
}

export const showCategoryOnWebSiteFailureAction = (message) => {
  return {
    type: SHOW_CATEGORY_ON_WEB_SITE_FAILURE,
    payload: message
  }
}
