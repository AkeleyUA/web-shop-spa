import React, { useState, useEffect } from 'react'
import {
  Paper,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box
} from '@material-ui/core'


import './CardsList.scss'
import { connect } from 'react-redux'
import { getProductsForClientRequestAction } from '../../pages/Home.page/action'
import { bindActionCreators } from 'redux'
import Preloader from '../Preloader/Preloader'
import PriceToggleButton from '../ToggleButton/ToggleButton'
import { RatingButton } from '../RatingBurron/RatingBurron'


const CardsList = ({ products, getProductsForClientRequest, currentCategory, loadingProducts }) => {

  useEffect(() => {
    if (currentCategory !== '') {
      getProductsForClientRequest(currentCategory)
    }
  }, [currentCategory])

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
              <Grid item xs={12} sm={6} md={6} lg={4} key={item._id}>
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
                    <RatingButton 
                      id={item._id}
                    />
                    <PriceToggleButton
                      product={item}
                    >
                      {item.price}
                    </PriceToggleButton>
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
    currentCategory: state.currentCategoryState.currentCategory,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardsList)