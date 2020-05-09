export const CHANGE_CURRENT_PAGE = 'CHANGE_CURRENT_PAGE'


export const changeCurrentPageAction = page => {
  return {
    type: CHANGE_CURRENT_PAGE,
    payload: page
  }
}