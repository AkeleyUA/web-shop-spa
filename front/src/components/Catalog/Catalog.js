import React from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Grid,
  Paper,
  Typography,
  Box,
} from '@material-ui/core'

import CategoriesList from '../CategoriesList/CategoriesList'
import CardsList from '../CardsList/CardsList'

import './Catalog.scss'


const Catalog = ({products}) => {
  return (
    <Box className="catalog-wrapper">
      <Grid
        container
        spacing={2}
      >
        <Grid item xs={12}>
          <Paper className="header">
            <Typography variant="h5">Header and filter</Typography>
          </Paper>
        </Grid>
        <Grid
          item
          xs={3}
        >
          <Paper className="filter">
            <Typography
            className="products-counter"
            variant="h5"
            >
              Товары ({ !products.length ? "..." : products.length})
            </Typography>
            <Box className="buttons-wrapper">
            <Button
              fullWidth
              color="primary"
              variant="contained"
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
            <CategoriesList/>
          </Paper>
        </Grid>
        <Grid
          item
          xs={9}
        >
          <CardsList/>
        </Grid>
      </Grid>
    </Box>
  )
}

const mapStateToProps = state => {
  return {
    products: state.forClientState.products
  }
}

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Catalog)