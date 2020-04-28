import {createContext} from 'react'

function noop () {}

export const CategoriesContext = createContext([
  {
    current: null,
    products: [],
    setCurrentCategory: noop,
    getProducts: noop
  }
])