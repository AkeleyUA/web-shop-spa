import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  TextField,
  InputAdornment,
  Icon,
  IconButton
} from '@material-ui/core'

import { changeSearchValueAction } from './action'
import { changeCurrentPageAction } from '../Products.Client/action'
import { setCurrentCategoryAction } from '../Categories.Client/action'

import './ProductsFilter.scss'



const ProductsFilter = ({ changeSearchValue, changeCurrentPage, searchValue, setCurrentCategory }) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    if (!searchValue){
      setValue('')
    }
  }, [searchValue])

  const changeHandler = (event) => {
    setValue(event.currentTarget.value)
  }

  const clearHandler = () => {
    setValue('')
    changeSearchValue(null)
    changeCurrentPage(1)
    setCurrentCategory('Все')
  }

  const searchHandler = () => {
    changeCurrentPage(1)
    setCurrentCategory('')
    changeSearchValue(value)
  }

  const keyHandler = event => {
    if (event.key === 'Enter') {
      searchHandler()
    }
  }

  return (
    <div
      className="product-list-filter"
    >
      <TextField
        fullWidth
        size="small"
        variant="outlined"
        label="Поиск"
        value={value}
        onKeyPress={keyHandler}
        InputProps={{
          onChange: changeHandler,
          endAdornment: (
            <InputAdornment position="end">
              {value
                ? <IconButton
                  color="default"
                  size="small"
                  onClick={clearHandler}
                >
                  <Icon>clear</Icon>
                </IconButton>
                : null
              }
              <IconButton
                size="small"
                color="primary"
                onClick={searchHandler}
              >
                <Icon>search</Icon>
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    searchValue: state.searchState.searchValue
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeSearchValue: bindActionCreators(changeSearchValueAction, dispatch),
    changeCurrentPage: bindActionCreators(changeCurrentPageAction, dispatch),
    setCurrentCategory: bindActionCreators(setCurrentCategoryAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsFilter)