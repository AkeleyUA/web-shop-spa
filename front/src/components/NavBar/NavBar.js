import React, { useState, useEffect } from 'react'
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
  Modal,
  Hidden,
  Menu,
  FormControl,
} from '@material-ui/core';

import './NavBar.scss'
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import CategoriesList from '../CategoriesList/CategoriesList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFilterValueAction } from './adction';
import { useSnackbar } from 'notistack'
import { clearProductsMessageAction } from '../../pages/Home.page/action';


const NavBar = ({ setFilterValue, message, clearProductsMessage, cart }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [focus, setFocus] = useState(false)
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState()
  const [value, setValue] = useState('')

  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }

  useEffect(() => {
    if (message) {
      enqueueSnackbar(message)
      clearProductsMessage()
    }
  }, [message, enqueueSnackbar])

  const handleMenuOpen = event => {
    setMenuOpen(true)
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuOpen(false)
  }

  const inputFilterHandler = (event) => {
    setValue(event.target.value)
  }

  const searchHandler = () => {
    setFilterValue(value)
  }

  const ShoppingCartWithRef = React.forwardRef((props, ref) => {
    return (
      <div tabIndex={-1} ref={ref} className="body-container-for-modal">
        {props.children}
      </div>
    )
  })

  const MenuItemsWithRef = React.forwardRef((props, ref) => {
    return (
      <div ref={ref} className="body-for-menu-items">
        {props.children}
      </div>
    )
  })

  const ref = React.createRef()

  return (
    <AppBar position="static" className="nav-bar" color="inherit" component="nav">
      <Toolbar className="tool-bar">
        <Hidden lgUp>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
          >
            <Icon>{menuOpen ? 'close' : 'menu'}</Icon>
          </IconButton>
          <Menu
            id="simple-menu"
            keepMounted
            open={menuOpen}
            onClose={handleMenuClose}
            classes={{
              paper: "mobile-menu"
            }}
            anchorEl={anchorEl}
          >
            <MenuItemsWithRef ref={ref}>
              <CategoriesList />
            </MenuItemsWithRef>
          </Menu>
        </Hidden>
        <Hidden smDown >
          <Typography variant="h3">LOGOtip</Typography>
        </Hidden>
        <Hidden mdDown>
          <Box className="phones-wrapper">
            <Button
              variant="outlined"
              color="primary"
              startIcon={<Icon>phone</Icon>}
            >
              +380 73 049 XX XX
              </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<Icon>phone</Icon>}
            >
              +380 73 049 XX XX
              </Button>
          </Box>
        </Hidden>
        <FormControl
          className="search-wrapper">
          <TextField
            fullWidth
            variant="outlined"
            label="Поиск"
            onChange={inputFilterHandler}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    color={focus ? 'primary' : 'default'}
                    onClick={searchHandler}
                    >
                    <Icon>search</Icon>
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </FormControl>
        <IconButton
          aria-label="cart"
          onClick={handleOpen}
        >
          <Badge badgeContent={cart.length} color="secondary">
            <Icon>shopping_cart</Icon>
          </Badge>
        </IconButton>
      </Toolbar>
      <Modal
        open={open}
        onClose={handleClose}
        BackdropProps={{ style: { display: 'flex', justifyContent: 'center' } }}
      >
        <ShoppingCartWithRef ref={ref}>
          <ShoppingCart />
        </ShoppingCartWithRef>
      </Modal>
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