export const SET_STEP = 'SET_STEP'

export const setStepAction = step => {
  return {
    type: SET_STEP,
    payload: step
  }
}