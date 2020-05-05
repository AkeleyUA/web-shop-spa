import { useState } from 'react'


export const useSetCurrent = () => {
  const [current, setCurrent] = useState(null)
  const [length, setLength] = useState(0)


  const setCurrentCategory = (category) => {
    setCurrent(category)
  }

  const setProductsLength = (productsLength) => {
    setLength(productsLength)
  }

  return { current, setCurrentCategory, setProductsLength, length }
}