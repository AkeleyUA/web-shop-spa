import React from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Grid,
  Typography,
  Box,
  Hidden,
  Drawer,
  Divider,
} from '@material-ui/core'

import CategoriesForClient from '../Categories.Client/Categories.Client'
import ProductsForClient from '../Products.Client/Products.Client'

import './Catalog.scss'
import { bindActionCreators } from 'redux'
import BottomNavBar from '../BottomNavBar/BottomNavBar'
import { getPopularEventAction, changeCurrentPageAction, getBestPriceEventAction } from '../Products.Client/action'


const Catalog = ({ getPopularProducts, setCurrentPage, getBestPrice }) => {
  const popularHandler = () => {
    getPopularProducts()
    setCurrentPage(1)
  }

  const bestPriceHandler = () => {
    getBestPrice()
    setCurrentPage(1)
  }

  return (
    <Box 
      className="catalog-wrapper"
    >
      <Grid
        container
      >
        <Hidden smDown>
          <Grid item md={3} lg={2}>
            <Drawer
              variant="permanent"
              className="categories-container"
              open
              PaperProps={{
                elevation: 1
              }}
            >
              <Typography
                className="products-counter"
                variant="h5"
              >
                Категории товаров
              </Typography>
              <Divider variant="middle" />
              <Box className="buttons-wrapper">
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  onClick={popularHandler}
                  size="small"
                >
                  Популярное
                </Button>
                <Button
                  fullWidth
                  color="secondary"
                  variant="contained"
                  onClick={bestPriceHandler}
                  size="small"
                >
                  Лучшие цены
                </Button>
              </Box>
              <Divider variant="middle" />
              <CategoriesForClient />
            </Drawer>
          </Grid>
        </Hidden>
        <Grid
          item
          lg={10}
          md={9}
          xs={12}
        >
          <ProductsForClient />
          <BottomNavBar />
        </Grid>
      </Grid>
    </Box>
  )
}

const mapStateToProps = state => {
  return {
    productsLength: state.clientProductsState.productsLength,
    message: state.clientProductsState.message
  }
}

const mapDispatchToProps = dispatch => ({
  getPopularProducts: bindActionCreators(getPopularEventAction, dispatch),
  getBestPrice: bindActionCreators(getBestPriceEventAction, dispatch),
  setCurrentPage: bindActionCreators(changeCurrentPageAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Catalog)