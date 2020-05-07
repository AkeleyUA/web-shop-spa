export const SET_FILTER_VALUE = 'SET_FILTER_VALUE'

export const setFilterValueAction = value => {
  return {
    type: SET_FILTER_VALUE,
    payload: value
  }
}