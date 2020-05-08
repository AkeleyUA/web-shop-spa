import React, { useState, useEffect, createRef, forwardRef } from 'react'
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  TextField,
  Icon,
  InputAdornment,
  Button,
  IconButton,
  Badge,
  Hidden,
  Drawer,
  FormControl,
  Divider,
  Link,
  Grid
} from '@material-ui/core';

import './NavBar.scss'
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import CategoriesForClient from '../Categories.Client/Categories.Client';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFilterValueAction } from './adction';
import { useSnackbar } from 'notistack'
import { clearProductsMessageAction } from '../../pages/Home.page/action';


const NavBar = ({ setFilterValue, message, clearProductsMessage, cart }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [focus, setFocus] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [value, setValue] = useState('')

  const cartHandleClose = () => {
    setCartOpen(false)
  }
  const CartHandleOpen = () => {
    setCartOpen(true)
  }

  useEffect(() => {
    if (message) {
      enqueueSnackbar(message)
      clearProductsMessage()
    }
  }, [message, enqueueSnackbar])

  const handleMenuOpen = event => {
    setMenuOpen(true)
  }

  const handleMenuClose = () => {
    setMenuOpen(false)
  }

  const inputFilterHandler = (event) => {
    setValue(event.target.value)
  }

  const searchHandler = () => {
    setFilterValue(value)
    setFocus(false)
  }

  const clearHandler = () => {
    setValue('')
  }

  const keyHandler = event => {
    if (event.key === 'Enter') {
      searchHandler()
      inputRef.current.blur()
    }
  }


  const inputRef = createRef()

  return (
    <AppBar position="fixed" style={{ zIndex: 1201 }} className="nav-bar" color="inherit" component="nav">
      <Toolbar className="tool-bar">
        <Hidden mdUp>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
          >
            <Icon>{menuOpen ? 'close' : 'menu'}</Icon>
          </IconButton>
          <Drawer
            variant="temporary"
            onClose={handleMenuClose}
            open={menuOpen}
            classes={{
              paper: 'mobild-drawer-papper'
            }}
          >
            <AppBar
              position="sticky"
              className="menu-app-bar nav-bar"
              color="inherit"
            >
              <Toolbar className="cart-bar">
                <Typography variant="h3" className="logo-mobile">LOGOtip</Typography>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="close-modal"
                  onClick={handleMenuClose}
                  className="btn-close-cart"
                  variant="outlined"
                >
                  <Icon>arrow_forward_ios</Icon>
                </IconButton>
              </Toolbar>
            </AppBar>
            <div className="categories-list-wrapper ">
              <Typography variant="caption" className="menu-caption">Категории товаров</Typography>
              <Divider variant="middle" className="menu-divider" />
              <CategoriesForClient />
              <Divider variant="middle" className="menu-divider" />
            </div>
            <AppBar
              position="sticky"
              className="menu-app-bar"
              color="inherit"
            >
              <Toolbar className="cart-bar">
                <Box
                  aria-label="social-links"
                  className="social-btn-group"
                >
                  <Link className="git" href="https://github.com/AkeleyUA" target="_blank" rel="noreferrer">
                    <Icon className="fab fa-github" fontSize="large" color="action" />
                  </Link>
                  <Link className="fb" href="https://www.facebook.com/profile.php?id=100017178317539" target="_blank" rel="noreferrer">
                    <Icon className="fab fa-facebook" fontSize="large" color="action" />
                  </Link>
                  <Link className="tlg" href="https://t.me/AkeleyUA" target="_blank" rel="noreferrer">
                    <Icon className="fab fa-telegram" fontSize="large" color="action" />
                  </Link>
                </Box>
              </Toolbar>
            </AppBar>
          </Drawer>
        </Hidden>
        <Hidden smDown >
          <Typography variant="h3">LOGOtip</Typography>
        </Hidden>
        <Hidden mdDown>
          <Box className="phones-wrapper">
            <Divider orientation="vertical" flexItem />
            <Button
              variant="outlined"
              color="primary"
              startIcon={<Icon>phone</Icon>}
            >
              +380 73 069 XX XX
            </Button>
            <Divider orientation="vertical" flexItem />
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<Icon>phone</Icon>}
            >
              +380 95 069 XX XX
            </Button>
            <Divider orientation="vertical" flexItem />
          </Box>
        </Hidden>
        <FormControl
          className="search-wrapper"
        >
          <TextField
            fullWidth
            variant="outlined"
            label="Поиск"
            onChange={inputFilterHandler}
            value={value}
            onKeyPress={keyHandler}
            inputProps={{
              ref: inputRef,
              onFocus: () => setFocus(true)
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {focus
                    ? <IconButton
                      color="primary"
                      onClick={searchHandler}
                      onBlur={() => setFocus(false)}
                    ><Icon>search</Icon></IconButton>
                    : (value && <IconButton
                      color="default"
                      onClick={clearHandler}
                    > <Icon>clear</Icon></IconButton>)
                  }
                </InputAdornment>
              )
            }}
          />
        </FormControl>
        <IconButton
          aria-label="cart"
          onClick={CartHandleOpen}
        >
          <Badge badgeContent={cart.length} color="secondary">
            <Icon>shopping_cart</Icon>
          </Badge>
        </IconButton>
      </Toolbar>
      <Hidden smDown>
        <Drawer
          open={cartOpen}
          aria-describedby="spring-modal-description"
          classes={{
            paper: 'cart-paper'
          }}
          onClose={cartHandleClose}
          anchor="right"
          closeAfterTransition
          BackdropProps={{
            timeout: 225,
          }}
        >
          <ShoppingCart cartHandleClose={cartHandleClose} />
        </Drawer>
      </Hidden>
      <Hidden mdUp>
        <Drawer
          open={cartOpen}
          aria-describedby="spring-modal-description"
          classes={{
            paper: 'cart-paper-mobile'
          }}
          onClose={cartHandleClose}
          anchor="right"
          closeAfterTransition
          BackdropProps={{
            timeout: 225,
          }}
        >
          <ShoppingCart cartHandleClose={cartHandleClose} />
        </Drawer>
      </Hidden>
    </AppBar>
  )
}

const mapStateToProps = state => {
  return {
    message: state.forClientState.message,
    cart: state.shoppingCartState.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setFilterValue: bindActionCreators(setFilterValueAction, dispatch),
    clearProductsMessage: bindActionCreators(clearProductsMessageAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)