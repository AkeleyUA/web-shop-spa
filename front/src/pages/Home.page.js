import React, { useState } from 'react'
import { NavBar } from '../components/NavBar/NavBar'
import { Stepper } from '../components/Stepper/Stepper'
import { Catalog } from '../components/Catalog/Catalog'
import { ShoppingCart } from '../components/ShoppingCart/ShoppingCart'

export const HomePage = () => {
  const [modalStatus, setModalStatus] = useState(false);

  const modalHandler = (status) => {
    setModalStatus(status)
  }

  return  (
    <>
      <NavBar modalHandler={modalHandler}/>
      <Stepper/>
      <Catalog />
      <ShoppingCart modalStatus={modalStatus} modalHandler={modalHandler}/>
    </>
  )
}