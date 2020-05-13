import React, { useRef, useState } from 'react'
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


import './Products.Client.scss'
import { connect } from 'react-redux'
import { getProductsForClientRequestAction } from '../../pages/Home.page/action'
import { bindActionCreators } from 'redux'
import Preloader from '../Preloader/Preloader'
import PriceToggleButton from '../ToggleButton/ToggleButton'
import { RatingButton } from '../RatingButton/RatingButton'



const productCreator = (arr) => {
  return arr.map(item => {
    return (
      <Grid key={item._id} item xs={!2} sm={6} md={4} lg={3}>
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
            <Typography variant="h4" color="primary">{item.price} &#8372;</Typography>
            <PriceToggleButton
              product={item}
            />
          </CardActions>
        </Card>
      </Grid>
    )
  })
}


const ProductsForClient = ({ products, loadingProducts }) => {
  return (
    <Paper className="cards-list-wrapper" elevation={1}>
      <Grid
        container
        direction="row"
        className="cards-list"
      >
        {loadingProducts ? <Preloader /> : productCreator(products)}
      </Grid>
    </Paper>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    getProductsForClientRequest: bindActionCreators(getProductsForClientRequestAction, dispatch)
  }
}

const mapStateToProps = state => {
  return {
    products: state.forClientState.products,
    loadingProducts: state.forClientState.loadingProducts
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsForClient)