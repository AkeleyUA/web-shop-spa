export const ADD_TO_SHOPPING_CART = 'ADD_TO_SHOPPING_CART'
export const DEL_FROM_SHOPPING_CART = 'DEL_FROM_SHOPPING_CART'


export const addToShoppingCartAction = product => {
  return {
    type: ADD_TO_SHOPPING_CART,
    payload: product
  }
}

export const delFromShoppingCartAction = id => {
  return {
    type: DEL_FROM_SHOPPING_CART,
    payload: id
  }
}