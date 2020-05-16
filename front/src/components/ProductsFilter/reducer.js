import { CHANGE_SEARCH_VALUE } from "./action"
import { SEARCH_PRODUCT_FOR_CLIENT_REQUEST } from "../Products.Client/action"


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
    case SEARCH_PRODUCT_FOR_CLIENT_REQUEST: {
      return {
        ...state,
        searchValue: null
      }
    }
    default: return state
  }
}