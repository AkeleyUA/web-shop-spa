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
  Modal,
  Hidden,
  Drawer,
  FormControl,
  Backdrop,
  Grow,
  Divider,
  Link
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
            <Box>
              <Box className="menu-header-group">
                <Typography variant="h3" className="logo-mobile">LOGOtip</Typography>
                <IconButton
                  className="menu-close-btn"
                  onClick={handleMenuClose}
                >
                  <Icon>close</Icon>
                </IconButton>
              </Box>
              <Divider variant="middle" className="menu-divider" />
              <Typography variant="caption" className="menu-caption">Категории товаров</Typography>
              <CategoriesForClient />
              <Divider variant="middle" className="menu-divider" />
            </Box>

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
          </Drawer>
          {/* <IconButton
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
            <MenuItemsWithRef ref={menuRef}>
              <CategoriesList />
            </MenuItemsWithRef>
          </Menu> */}
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
          className="search-wrapper">
          <TextField
            fullWidth
            variant="outlined"
            label="Поиск"
            onChange={inputFilterHandler}
            onKeyPress={keyHandler}
            inputProps={{
              ref: inputRef,
              onFocus: () => setFocus(true),
              onBlur: () => setFocus(false)
            }}
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
        aria-describedby="spring-modal-description"
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Grow in={open}>
          <div className='body-container-for-modal'>
            <ShoppingCart id="spring-modal-description" />
          </div>
        </Grow>
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