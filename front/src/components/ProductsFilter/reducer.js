import { CHANGE_SEARCH_VALUE } from "./action"


const initialState = {
  searchValue: null
}

export const searchState = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SEARCH_VALUE: {
      return {
        ...state,
        searchValue: action.payload
      }
    }
    default: return state
  }
}