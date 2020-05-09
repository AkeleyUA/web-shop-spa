import React, {useState, useEffect} from 'react'
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
import { changeCurrentPageAction } from './action';

const BottomNavBar = ({ productsLength, changeCurrentPage, currentPage }) => {
  console.log(currentPage)
  const paginationHandler = (event, newValue) => {
    changeCurrentPage(newValue)
  }

  return (
    <AppBar
      position="sticky"
      className="app-bottom-bar"
      color="inherit"
    >
      <Toolbar className="bottom-bar">
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
        {productsLength < 18
          ? null
          : <Pagination
            className="bottom-pagination"
            count={Math.ceil(productsLength / 18)}
            shape="rounded"
            color="secondary"
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
    productsLength: state.forClientState.productsLength,
    currentPage: state.paginationState.currentPage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeCurrentPage: bindActionCreators(changeCurrentPageAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomNavBar)