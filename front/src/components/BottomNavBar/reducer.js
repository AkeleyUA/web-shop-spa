import { CHANGE_CURRENT_PAGE } from "./action"


const initialState = {
  currentPage: 1
}

export const paginationState = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.payload
      }
    }
    default: return state
  }
}