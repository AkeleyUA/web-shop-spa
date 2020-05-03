export const CALL_TOAST = 'CALL_TOAST'
export const CLOASE_TOAST = 'CLOASE_TOAST'

export const callToastAction = (message, category) => {
  return {
    type: CALL_TOAST,
    payload: {
      message,
      category
    }
  }
}

export const closeToastAction = () => {
  return {
    type: CLOASE_TOAST
  }
}