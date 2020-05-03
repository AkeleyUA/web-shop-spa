import { useState } from 'react'

const selectedProducts = 'selectedProducts'

export const useCart = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem(selectedProducts)) || [])
  const [products, setProducts] = useState({})
  
  const addToCart = (id) => {
    const data = [...cart, id]
    const uniqueData = new Set(data);
    const newData = [...uniqueData]
    setCart(newData)
    localStorage.setItem(selectedProducts, JSON.stringify(newData))
  }

  const delFromCart = (id) => {
    console.log(id)
    const data = cart.filter((item) => item !== id)
    setCart(data)
    localStorage.setItem(selectedProducts, JSON.stringify(data))
  }

  const addToCartProducts = (arr) => {
    setProducts(arr)
  }
  console.log(cart)
  return { cart, addToCart, products, addToCartProducts, delFromCart }
}