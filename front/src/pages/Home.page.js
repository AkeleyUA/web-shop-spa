import React, { useState } from 'react'
import { NavBar } from '../components/NavBar/NavBar'
import { Catalog } from '../components/Catalog/Catalog'
import { ShoppingCart } from '../components/ShoppingCart/ShoppingCart'


import { orange, blue } from '@material-ui/core/colors';
import {
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core';
import { ruRU } from '@material-ui/core/locale'
import { connect } from 'react-redux';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[800]
    },
    secondary: {
      main: orange[800]
    },
  },
}, ruRU)

const HomePage = () => {

  return  (
    <ThemeProvider theme={theme}>
      <NavBar />
      {/* <Catalog />
      <ShoppingCart modalStatus={modalStatus} modalHandler={modalHandler}/> */}
    </ThemeProvider>
  )
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => {
  return {
    
  }
}

export default connect()(HomePage)