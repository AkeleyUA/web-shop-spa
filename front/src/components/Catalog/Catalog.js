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
import { Pagination } from '@material-ui/lab'

import CategoriesForClient from '../Categories.Client/Categories.Client'
import ProductsForClient from '../Products.Client/Products.Client'

import './Catalog.scss'
import { bindActionCreators } from 'redux'
import { setCurrentCategoryAction } from '../Categories.Client/action'


const Catalog = ({ products, setCurrentCategory }) => {

  const popularHandler = () => {
    setCurrentCategory('Популярно')
  }

  return (
    <Box className="catalog-wrapper">
      <Grid
        container
        spacing={2}
      >
        <Hidden smDown>
          <Grid item md={3} lg={3}>
            <Drawer
              variant="permanent"
              className="categories-container"
              open
            >
              <Typography
                className="products-counter"
                variant="h5"
              >
                Товары ({!products.length ? "..." : products.length})
              </Typography>
              <Divider variant="middle" />
              <Box className="buttons-wrapper">
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  onClick={popularHandler}
                >
                  Популярное
                </Button>
                <Button
                  fullWidth
                  color="secondary"
                  variant="contained"
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
          lg={9}
          md={9}
          xs={12}
        >
          <ProductsForClient />
          <Pagination count={10} color="secondary" />
        </Grid>
      </Grid>
    </Box>
  )
}

const mapStateToProps = state => {
  return {
    products: state.forClientState.products,
    message: state.forClientState.message
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentCategory: bindActionCreators(setCurrentCategoryAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Catalog)