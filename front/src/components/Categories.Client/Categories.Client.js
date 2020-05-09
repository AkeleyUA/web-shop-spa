import React, { useState, useEffect } from 'react'
import {
  Icon,
  List,
  ListItem,
  Button,
  Typography
} from '@material-ui/core'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setCurrentCategoryAction } from './action'

import './Categories.Client.scss'
import Preloader from '../Preloader/Preloader'

const CategoriesForClient = ({ categories, setCurrentCategory, loadingCategories, currentCategory }) => {
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
          onClick={() => setCurrentCategory(item.name)}
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
      {loadingCategories ? <Preloader /> : listCreator(categories)}
    </List>
  )
}


const mapStateToProps = state => {
  return {
    categories: state.forClientState.categories,
    loadingCategories: state.forClientState.loadingCategories,
    currentCategory: state.currentCategoryState.currentCategory
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentCategory: bindActionCreators(setCurrentCategoryAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesForClient)