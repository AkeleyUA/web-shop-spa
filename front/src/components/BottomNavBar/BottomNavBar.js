import React from 'react'
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Icon,
  Hidden,
  Link
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab'
import { connect } from 'react-redux'

import './BottomNavBar.scss'
import { bindActionCreators } from 'redux';
import { changeCurrentPageAction } from '../Products.Client/action';

const BottomNavBar = ({ productsLength, changeCurrentPage, currentPage }) => {
  const paginationHandler = (event, newValue) => {
    changeCurrentPage(newValue)
  }

  return (
    <AppBar
      position="static"
      className="app-bottom-bar"
      color="inherit"
      elevation={1}
    >
      <Toolbar
        className="bottom-bar"
      >
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
        {productsLength < 16
          ? null
          : <Pagination
            size="small"
            className="bottom-pagination"
            count={Math.ceil(productsLength / 16)}
            color="secondary"
            page={currentPage}
            onChange={paginationHandler}
          />
        }
        <Hidden xsDown>
          <Typography variant="h6">LOGOtip</Typography>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = state => {
  return {
    productsLength: state.clientProductsState.productsLength,
    currentPage: state.clientProductsState.currentPage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeCurrentPage: bindActionCreators(changeCurrentPageAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomNavBar)