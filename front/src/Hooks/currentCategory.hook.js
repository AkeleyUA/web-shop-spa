import { useState } from 'react'

export const useSetCurrent = () => {
  const [current, setCurrent] = useState(null)

  const setCurrentCategory = (category) => {
    setCurrent(category)
  }

  return { current, setCurrentCategory }
}