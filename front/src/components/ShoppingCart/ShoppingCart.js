import React from 'react'
import Paper from '@material-ui/core/Paper'

import './ShoppingCart.scss'
import { connect } from 'react-redux'
import {
  CardActionArea,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Icon,
  ListItem,
  Typography,
  Hidden,
  Button,
  Link,
  List,
  Box,
  AppBar,
  Toolbar
} from '@material-ui/core'
import { bindActionCreators } from 'redux'
import { delFromShoppingCartAction } from '../ToggleButton/action'
import { useSnackbar } from 'notistack'

const columns = [
  {
    id: 'name',
    label: "Название",
  },
  {
    id: 'price',
    label: "Цена",
  },
  {
    id: 'delete',
    label: "Удалить",
  },
]

const ShoppingCart = ({ cart, cartHandleClose, delFromSoppingCart }) => {
  const { enqueueSnackbar } = useSnackbar()
  const total = () => {
    const prices = cart.map(item => item.price)
    if (prices.length > 0) {
      return prices.reduce((a, b) => a + b)
    } else {
      return 0
    }
  }

  const delFromCartHandler = (id) => {
    delFromSoppingCart(id)
    enqueueSnackbar('Удалено из корзины')
  }

  return (
    <div className="full-height">
      <AppBar
        position="sticky"
        className="cart-app-bar nav-bar"
        color="inherit"
      >
        <Toolbar className="cart-bar">
          <Hidden only={['xs', 'md']}>
            <Typography variant="h6">
              Корзина
          </Typography>
          </Hidden>
          <Typography variant="button" color="primary" >Всего: {total().toFixed(2)}&nbsp;$</Typography>
          <Button color="secondary" variant="contained" disabled={!cart.length > 0}>
            Оформить заказ
          </Button>
          <Hidden only={['xs', 'md']}>
            <Button
              color="primary"
              variant="outlined"
              onClick={cartHandleClose}
            >
              Продолжить покупки
            </Button>
          </Hidden>
          <Hidden only={['sm', 'lg', 'xl']}>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="close-modal"
              onClick={cartHandleClose}
              className="btn-close-cart"
              variant="outlined"
            >
              <Icon>arrow_forward_ios</Icon>
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
      <List className="cart-wrapper">
        {cart && cart.length > 0 ? cart.map(item => (
          <ListItem key={item._id} className="cart-item">
            <Card
              className="card"
              variant="outlined"
            >
              <CardMedia
                className="card-img"
                image={item.img}
                title={item.name}
              />
              <CardContent
                className="card-description"
              >
                <Typography gutterBottom variant="h5" component="h2">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.description}
                  {item.description}
                  {item.description}
                </Typography>
                <div className="count">

                </div>
              </CardContent>
              <CardActions
                disableSpacing={true}
                className="cart-card-actions"
              >
                <IconButton
                  size="small"
                  onClick={() => { delFromCartHandler(item._id) }}
                >
                  <Icon>close</Icon>
                </IconButton>
              </CardActions>
            </Card>
          </ListItem>
        )) : <div className="cart-empry-text"><Typography variant="body1" fontSize={30} color="textSecondary">Корзина пуста</Typography></div>}
      </List>
      <AppBar
        position="sticky"
        className="cart-app-bottom-bar"
        color="inherit"
      >
        <Toolbar className="cart-bottom-bar">
          <Hidden xsDown>
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
          </Hidden>
          <Typography variant="h6">LOGOtip</Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    cart: state.shoppingCartState.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    delFromSoppingCart: bindActionCreators(delFromShoppingCartAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)