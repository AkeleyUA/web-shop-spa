import React, { useEffect } from 'react'
import { NavBar } from '../../components/NavBar/NavBar'
import Catalog from '../../components/Catalog/Catalog'

import { connect } from 'react-redux';
import { getProductsForClientRequestAction, getCategoriesForClientRequestAction } from './action';
import { bindActionCreators } from 'redux';



const HomePage = () => {

  return  (
    <>
      <NavBar />
      <Catalog />
    </>
  )
}

export default HomePage