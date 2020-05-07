import { ADD_TO_SHOPPING_CART, DEL_FROM_SHOPPING_CART } from "./action"


const initialState = {
  cart: localStorage.getItem('shopping-cart') ? JSON.parse(localStorage.getItem('shopping-cart')) : []
}

export const shoppingCartState = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_SHOPPING_CART: {
      return {
        ...state,
        cart: [...state.cart, action.payload]
      }
    }
    case DEL_FROM_SHOPPING_CART: {
      return {
        ...state,
        cart: state.cart.filter(item => item._id !== action.payload)
      }
    }
    default: return state
  }
}