import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Paper,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid
} from '@material-ui/core'

import { useSnackbar } from 'notistack'
import { getProductsForClientRequestAction, searchProductForClientRequestAction, getPopularProductsRequestAction, getBestPriceProductsRequestAction } from './action'
import Preloader from '../Preloader/Preloader'
import PriceToggleButton from '../ToggleButton/ToggleButton'
import { RatingButton } from '../RatingButton/RatingButton'

import './Products.Client.scss'

const limit = 16

const productCreator = (arr) => {
  return arr.map(item => {
    return (
      <Grid key={item._id} item xs={12} sm={6} md={6} lg={3} justify="space-around">
        <Card
          className="card"
          variant="outlined"
        >
          <CardActionArea>
            <CardMedia
              className="card-img"
              image={item.img}
              title={item.name}
            />
            <CardContent className="card-content">
              <Typography className="card-content-text" gutterBottom variant="subtitle1">
                {item.name}
              </Typography>
              <RatingButton
                id={item._id}
              />
            </CardContent>
          </CardActionArea>
          <CardActions
            disableSpacing={true}
          >
            {item.sale > 0
              ? <div className="price">
                <Typography className="onld-price" variant="caption">{item.price} &#8372;</Typography>
                <Typography variant="h4" color="secondary">{(item.price - (item.price * (item.sale / 100))).toFixed(2)} &#8372;</Typography>
              </div>
              : <div className="price">
                <Typography variant="h4" color="primary">{item.price} &#8372;</Typography>
              </div>
            }
            <PriceToggleButton
              product={item}
            />
          </CardActions>
        </Card>
      </Grid>
    )
  })
}


const ProductsForClient = ({
  products,
  loading,
  message,
  getProductsForClientRequest,
  currentPage,
  searchProductForClientRequest,
  search,
  currentCategory,
  isPopular,
  getPopularProductsRequest,
  isBestPrice,
  getBestPriceProductsRequest
}) => {

  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (!search && !isPopular && !isBestPrice) {
      getProductsForClientRequest(currentCategory, limit, currentPage - 1)
    }
  }, [currentPage, currentCategory])

  useEffect(() => {
    if (search) {
      searchProductForClientRequest(search, limit, currentPage - 1)
    }
  }, [currentPage, search])

  useEffect(() => {
    if (isPopular) {
      getPopularProductsRequest(limit, currentPage - 1)
    }
  }, [currentPage, isPopular])

  useEffect(() => {
    if (isBestPrice) {
      getBestPriceProductsRequest(limit, currentPage - 1)
    }
  }, [isBestPrice, currentPage - 1])

  useEffect(() => {
    if (message) {
      enqueueSnackbar(message)
    }
  }, [message, enqueueSnackbar])

  return (
    <Paper className="cards-list-wrapper" elevation={1}>
      <Grid
        container
        direction="row"
        className="cards-list"
      >
        {loading ? <Preloader className="producrt-preloader" /> : productCreator(products)}
      </Grid>
    </Paper>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    getProductsForClientRequest: bindActionCreators(getProductsForClientRequestAction, dispatch),
    searchProductForClientRequest: bindActionCreators(searchProductForClientRequestAction, dispatch),
    getPopularProductsRequest: bindActionCreators(getPopularProductsRequestAction, dispatch),
    getBestPriceProductsRequest: bindActionCreators(getBestPriceProductsRequestAction, dispatch)
  }
}

const mapStateToProps = state => {
  return {
    products: state.clientProductsState.products,
    loading: state.clientProductsState.loading,
    message: state.clientProductsState.message,
    currentPage: state.clientProductsState.currentPage,
    search: state.clientProductsState.search,
    currentCategory: state.clientCategoriesState.currentCategory,
    isPopular: state.clientProductsState.isPopular,
    isBestPrice: state.clientProductsState.isBestPrice,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsForClient)