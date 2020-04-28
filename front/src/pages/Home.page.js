import React, { useState } from 'react'
import { NavBar } from '../components/NavBar/NavBar'
import { Stepper } from '../components/Stepper/Stepper'
import { Catalog } from '../components/Catalog/Catalog'
import { ShoppingCart } from '../components/ShoppingCart/ShoppingCart'
import { CategoriesContext } from '../context/CategoriesContext'
import { useSetCurrent } from '../Hooks/currentCategory.hook'

export const HomePage = () => {
  const {current,setCurrentCategory } = useSetCurrent()
  const [modalStatus, setModalStatus] = useState(false);

  const modalHandler = (status) => {
    setModalStatus(status)
  }
  return  (
    <CategoriesContext.Provider
      value={{current, setCurrentCategory}}
    >
      <NavBar modalHandler={modalHandler}/>
      <Stepper/>
      <Catalog />
      <ShoppingCart modalStatus={modalStatus} modalHandler={modalHandler}/>
    </CategoriesContext.Provider>
  )
}