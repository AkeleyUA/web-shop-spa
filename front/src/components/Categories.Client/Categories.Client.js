import React, { useEffect, useCallback } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  Icon,
  List,
  ListItem,
  Button,
  Typography
} from '@material-ui/core'

import { setCurrentCategoryAction, getCategoriesForClientRequestAction, clearMessageAction } from './action'
import { useSnackbar } from 'notistack'
import Preloader from '../Preloader/Preloader'
import { changeCurrentPageAction } from '../BottomNavBar/action'

import './Categories.Client.scss'
import { changeSearchValueAction } from '../ProductsFilter/action'

const CategoriesForClient = ({
  categories,
  setCurrentCategory,
  loading,
  message,
  changeSearchValue,
  changeCurrentPage,
  currentCategory,
  getCategoriesForClientRequest,
  currentPage,
  searchValue,
  clearMessage
}) => {
  const { enqueueSnackbar } = useSnackbar()

  const getCategories = useCallback(
    () => {
      getCategoriesForClientRequest()
    },
    [getCategoriesForClientRequest],
  )

  useEffect(() => {
    getCategories()
  }, [getCategories])

  useEffect(() => {
    if (message) {
      enqueueSnackbar(message)
      clearMessage()
    }
  }, [message, enqueueSnackbar, clearMessage])

  const categoryChengeHandler = event => {
    if (searchValue) {
      changeSearchValue(null)
    }
    if (currentPage !== 1) {
      changeCurrentPage(1)
    }
    setCurrentCategory(event.currentTarget.name)
  }

  const listCreator = (arr) => {
    return arr.map((item) => (
      <ListItem key={item.name}>
        <Button
          fullWidth
          size="small"
          classes={{
            fullWidth: (currentCategory === item.name ? 'full-width-btn active' : 'full-width-btn')
          }}
          variant='text'
          name={item.name}
          onClick={categoryChengeHandler}
          color={currentCategory === item.name ? 'secondary' : 'default'}
          endIcon={currentCategory === item.name ? <Icon>beenhere</Icon> : null}
        >
          <Typography variant="button">{item.name}</Typography>
        </Button>
      </ListItem>
    ))
  }

  return (
    <List className="categories-list" disablePadding>
      {loading ? <Preloader /> : listCreator(categories)}
    </List>
  )
}


const mapStateToProps = state => {
  return {
    categories: state.clientCategoriesState.categories,
    loading: state.clientCategoriesState.loading,
    currentCategory: state.clientCategoriesState.currentCategory,
    message: state.clientCategoriesState.message,
    searchValue: state.searchState.searchValue,
    currentPage: state.clientProductsState.currentPage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCategoriesForClientRequest: bindActionCreators(getCategoriesForClientRequestAction, dispatch),
    setCurrentCategory: bindActionCreators(setCurrentCategoryAction, dispatch),
    changeCurrentPage: bindActionCreators(changeCurrentPageAction, dispatch),
    changeSearchValue: bindActionCreators(changeSearchValueAction, dispatch),
    clearMessage: bindActionCreators(clearMessageAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesForClient)