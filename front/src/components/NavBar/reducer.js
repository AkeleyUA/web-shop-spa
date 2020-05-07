import { SET_FILTER_VALUE } from "./adction"


const initialState = {
  value: '',
}

export const filterState = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER_VALUE: {
      return {
        ...state,
        value: action.payload
      }
    }
    default: return state
  }
}