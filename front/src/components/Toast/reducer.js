import { CALL_TOAST, CLOASE_TOAST } from "./action";


const initialState = {
  isShow: false,
  message: '',
  category: 'error'
}

export const toastState = (state = initialState, action) => {
  switch (action.type) {
    case CALL_TOAST:
      return {
        ...state,
        isShow: true,
        message: action.payload.message,
        category: action.payload.category
      }
    case CLOASE_TOAST: 
      return {
        ...state,
        isShow: false,
        message: '',
        category: ''
      }
    default: return state;
  }
}