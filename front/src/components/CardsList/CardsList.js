import React, { useState, useEffect, useCallback } from 'react'
import {
  Paper,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  Icon,
  Button,
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { useSnackbar } from 'notistack';

import './CardsList.scss'
import { connect } from 'react-redux';
import { getProductsForClientRequestAction } from '../../pages/Home.page/action';
import { bindActionCreators } from 'redux';
import Preloader from '../Preloader/Preloader';


const CardsList = ({ products, getProductsForClientRequest, currentCategory, loadingProducts }) => {
  const [ratingValue, setRatinValue] = useState(3)
  const { enqueueSnackbar } = useSnackbar();

  const ratingHandler = (event, newValue) => {
    setRatinValue(+newValue)
  }

  const addToCartHandler = () => {
    enqueueSnackbar('Добавлено в корзину')
  }

  useEffect(() => {
    getProductsForClientRequest(currentCategory)
  }, [currentCategory, getProductsForClientRequest])

  if (loadingProducts) {
    return (
      <Preloader />
    )
  } else {
    return (
      <Paper className="cards-list">
        <Grid container spacing={3}>
          {products.map(item => {
            return (
              <Grid item xs={4} key={item._id}>
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
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {item.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions
                    disableSpacing={true}
                  >
                    <Box component="div">
                      <Typography component="legend" variant="caption">Оценка: {ratingValue}</Typography>
                      <Rating
                        name="product-rating"
                        value={ratingValue}
                        onChange={ratingHandler}
                      />
                    </Box>
                    <Box component="div" className="card-button-wrapper">
                      <Button
                        color="primary"
                        variant="contained"
                        aria-label="add to shopping cart"
                        onClick={addToCartHandler}
                        endIcon={<Icon>shopping_cart</Icon>}
                      >
                        {item.price} $
                      </Button>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Paper>
    )
  }

}

const mapDispatchToProps = dispatch => {
  return {
    getProductsForClientRequest: bindActionCreators(getProductsForClientRequestAction, dispatch)
  }
}

const mapStateToProps = state => {
  return {
    products: state.forClientState.products,
    loadingProducts: state.forClientState.loadingProducts,
    currentCategory: state.currentCategoryState.currentCategory
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardsList)