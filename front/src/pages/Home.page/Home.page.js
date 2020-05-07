import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import Catalog from '../../components/Catalog/Catalog'
import { ToUpButton } from '../../components/ToUpButton/ToUpButton'

const HomePage = () => {

  return  (
    <div >
      <NavBar />
      <Catalog />
      <ToUpButton />
    </div>
  )
}

export default HomePage