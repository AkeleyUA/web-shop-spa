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
import { RatingButton } from '../RatingBurron/RatingBurron'
import { ToUpButton } from '../ToUpButton/ToUpButton'


const productCreator = (arr) => {
  return arr.map(item => {
    return (
      <Grid item xs={12} sm={6} md={6} lg={3} key={item._id}>
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
              <Typography className="card-content-text" gutterBottom variant="h5" component="h2">
                {item.name}
              </Typography>
              <Typography className="card-content-text" variant="body2" color="textSecondary" component="p">
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
  })
}


const ProductsForClient = ({ products, loadingProducts }) => {
  const cardsRef = useRef(null)
  const [showScrollTo, setShowScrollTo] = useState(false)

  const handleScroll = () => {
    if (cardsRef.current.scrollTop > 400) {
      setShowScrollTo(true)
    } else {
      setShowScrollTo(false)
    }
  }

  return (
    <Paper className="cards-list-wrapper" elevation={1}>
      <Grid ref={cardsRef} onScroll={handleScroll} container className="cards-list">
        {loadingProducts ? <Preloader /> : productCreator(products)}
      </Grid>
      <ToUpButton show={showScrollTo} cardsRef={cardsRef} />
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