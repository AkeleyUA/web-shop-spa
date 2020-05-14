export const CHANGE_SEARCH_VALUE = 'CHANGE_SEARCH_VALUE'

export const changeSearchValueAction = value => {
  return {
    type: CHANGE_SEARCH_VALUE,
    payload: value
  }
}