export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY'


export const setCurrentCategoryAction = category => {
  return {
    type: SET_CURRENT_CATEGORY,
    payload: category
  }
}