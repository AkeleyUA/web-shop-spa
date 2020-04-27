import React from 'react'
import { NavBar } from '../components/NavBar/NavBar'
import { Stepper } from '../components/Stepper/Stepper'
import { Catalog } from '../components/Catalog/Catalog'

export const HomePage = () => {
  return  (
    <>
      <NavBar />
      <Stepper/>
      <Catalog />
    </>
  )
}