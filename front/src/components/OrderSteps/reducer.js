import { SET_STEP } from "./action"


const initialState = {
  step: 0,
  completed: true
}

export const stepsState = (state = initialState, action) => {
  switch (action.type) {
    case SET_STEP: {
      return {
        ...state,
        step: action.payload
      }
    }
    default: return state
  }
}