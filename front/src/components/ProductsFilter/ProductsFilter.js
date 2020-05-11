import React, { useState } from 'react'
import {
  TextField,
  Typography,
  Button,
  Grid,
  MenuItem
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { createFilterOptions } from '@material-ui/lab/Autocomplete'
import { connect } from 'react-redux'

import './ProductsFilter.scss'
import { bindActionCreators } from 'redux'
import { setFilterValueAction } from '../NavBar/adction'

const ProductsFilter = ({ products, setFilterValue }) => {
  const autocompleteRef = React.createRef()
  const [value, setValue] = useState('')
  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: option => option.name,
  })

  const changeHandler = (event, newValue) => {
    setValue(newValue)
  }

  const filterHandler = (event, newValue) => {
    if(newValue === null) {
      setFilterValue(' ')
    } else {
      setFilterValue(newValue.name || newValue)
    }
  }

  return (
    <div
      className="product-list-filter"
    >
      <Autocomplete
        fullWidth
        size='small'
        id="products"
        options={products.sort(item => item.name)}
        getOptionLabel={(option) => option.name || option}
        onChange={filterHandler}
        freeSolo
        blurOnSelect
        clearOnEscape
        renderInput={(params) =>
          <TextField {...params}
            label="Введите имя товара"
            variant="outlined"
          />
        }
        renderOption={(item) => (
          <Typography variant="body1">{item.name}&nbsp;<Typography variant="caption">{item.category}</Typography></Typography>
          
        )}
        onInputChange={changeHandler}
        filterOptions={filterOptions}
      />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    products: state.productsState.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setFilterValue: bindActionCreators(setFilterValueAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsFilter)