import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  TextField,
  Icon,
  InputAdornment,
  Button,
  ThemeProvider,
  createMuiTheme,
  IconButton,
  withStyles,
  Badge,
  Modal,
  Paper
} from '@material-ui/core';

import './NavBar.scss'
import { ShoppingCart } from '../ShoppingCart/ShoppingCart';


const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge)

export const NavBar = () => {
  const [focus, setFocus] = useState(false)
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }

  const ShoppingCartWithRef = React.forwardRef((props, ref) => {
    return (
      <div tabIndex={-1} ref={ref} className="body-container-for-modal">
        {props.children}
      </div>
    )
  })

  const ref = React.createRef()

  return (
    <AppBar position="static" className="nav-bar" color="inherit" component="nav">
      <Toolbar className="tool-bar">
        <Typography variant="h3">LOGOtip</Typography>
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
        <Box className="search-wrapper">
          <TextField
            fullWidth
            variant="outlined"
            label="Поиск"
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon color={focus ? "primary" : "inherit"}>search</Icon>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {focus ? <Button color="primary" variant="contained">Найти</Button> : <Icon></Icon>}
                </InputAdornment>
              )
            }}
          />
        </Box>
        <IconButton
          aria-label="cart"
          onClick={handleOpen}
        >
          <StyledBadge badgeContent={4} color="secondary">
            <Icon>shopping_cart</Icon>
          </StyledBadge>
        </IconButton>
      </Toolbar>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <ShoppingCartWithRef ref={ref}>
            <ShoppingCart/>
        </ShoppingCartWithRef>
      </Modal>
    </AppBar>
  )
}