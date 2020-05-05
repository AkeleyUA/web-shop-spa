import React, { useState, useEffect } from 'react'
import {
  Typography,
  Tab,
  Tabs,
  Box
} from '@material-ui/core'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setCurrentCategoryAction } from './action'

import './CategoriesList.scss'
import { getCategoriesForClientRequestAction } from '../../pages/Home.page/action'
import Preloader from '../Preloader/Preloader'

const CategoriesList = ({categories, setCurrentCategory, getCategoriesForClientRequest, loadingCategories }) => {
  const [checkedCategory, setCheckCategory] = useState(0)

  const changeHandler = event => {
    setCheckCategory(event.currentTarget.tabIndex)
    setCurrentCategory(categories[event.currentTarget.tabIndex].name)
  }

  useEffect(() => {
    getCategoriesForClientRequest()
  }, [getCategoriesForClientRequest])

  if (loadingCategories) {
    return (
      <Preloader/>
    )
  } else {
    return (
      <Box className="tabs-wrapper">
        <Typography className="tabs-title" variant="subtitle2">Категория</Typography>
        <Tabs
          orientation="vertical"
          variant="fullWidth"
          value={checkedCategory}
          onChange={changeHandler}
          TabIndicatorProps={{ style: { left: 0, right: 'auto' } }}
          label="Категория"
        >
          {categories.map((item, index) => {
            return (
              <Tab
                key={item._id}
                type="button"
                label={
                  <Typography
                    variant={checkedCategory === index ? "h6" : "body2"}
                    color={checkedCategory === index ? 'secondary' : 'initial'}
                    component="p"
                  >
                    {item.name}
                  </Typography>
                }
                tabIndex={index}
                value={index}
              />
            )
          })}
        </Tabs>
      </Box>
    )
  } 
}


const mapStateToProps = state => {
  return {
    categories: state.forClientState.categories,
    loadingCategories: state.forClientState.loadingCategories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentCategory: bindActionCreators(setCurrentCategoryAction, dispatch),
    getCategoriesForClientRequest: bindActionCreators(getCategoriesForClientRequestAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList)