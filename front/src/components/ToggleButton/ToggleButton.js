import React, { useState, useEffect } from 'react';
import { Button, Icon, Box } from '@material-ui/core';

import { useSnackbar } from 'notistack'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addToShoppingCartAction, delFromShoppingCartAction } from './action'

const PriceToggleButton = ({ children, product, addToCart, delFromCart, cart }) => {
  const [selected, setSelected] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    const findProduct = cart.find(item => item._id === product._id)
    if (findProduct) {
      setSelected(true)
    } else {
      setSelected(false)
    }
  }, [cart])

  const handler = () => {
    let findProduct = cart.find(item => item._id === product._id)
    if (findProduct) {
      enqueueSnackbar('Удалено из корзины')
      delFromCart(product._id)
      setSelected(false)
    } else {
      enqueueSnackbar('Добавлено в корзину')
      addToCart(product)
      setSelected(true)
    }
  }

  return (
    <Box component="div" className="card-button-wrapper">
      <Button
        color={selected ? 'inherit' : 'primary'}
        variant={selected ? 'outlined' : 'contained'}
        aria-label="add to shopping cart"
        onClick={handler}
        endIcon={selected ? <Icon>check</Icon> : <Icon>shopping_cart</Icon>}
      >
        {children.toFixed(2)} $
    </Button>
    </Box>
  )
}

const mapStateToProps = state => {
  return {
    cart: state.shoppingCartState.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: bindActionCreators(addToShoppingCartAction, dispatch),
    delFromCart: bindActionCreators(delFromShoppingCartAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceToggleButton)