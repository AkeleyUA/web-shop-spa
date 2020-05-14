import React, { useState, useEffect } from 'react';
import { Icon, IconButton } from '@material-ui/core';

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
  }, [cart, product._id])

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

  return selected
    ? <IconButton onClick={handler} color="inherit">
        <Icon>check</Icon>
      </IconButton>
    : <IconButton onClick={handler} color="primary">
        <Icon>shopping_cart</Icon>
      </IconButton>
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