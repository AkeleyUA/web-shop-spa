import { SET_CURRENT_CATEGORY } from "./action"


const initialState = {
  currentCategory: 'Популярно'
}

export const currentCategoryState = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_CATEGORY: {
      return {
        ...state,
        currentCategory: action.payload
      }
    }
    default: return state
  }
}