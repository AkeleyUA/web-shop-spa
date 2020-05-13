import React, { useState, useCallback, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { TextField, Button, Select, MenuItem, FormHelperText, FormControl, Paper } from '@material-ui/core'

import './ProductCreator.scss'
import { bindActionCreators } from 'redux'
import { addProductRequestAction, addProductFailureAction, clearMessageAction } from './action'
import { getCategoriesRequestAction } from '../Categories.Admin/action'
import { useSnackbar } from 'notistack'

const ProductCreator = ({
  message,
  loading,
  addProductRequest,
  categories,
  getCategoriesRequest,
  categoriesLoading,
  clearMessage
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const [form, setForm] = useState(
    {
      name: '',
      category: '',
      amount: '',
      img: '',
      description: '',
      price: '',
    }
  )

  const changeInputHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const addProductHandler = () => {
    addProductRequest(form)
  }

  useEffect(() => {
    getCategoriesRequest()
  }, [])

  useEffect(() => {
    if (message === 'Новый товар добавлен') {
      setForm({
        name: '',
        category: '',
        amount: '',
        img: '',
        description: '',
        price: '',
      })
    }
  }, [])

  useEffect(() => {
    if (message) {
      enqueueSnackbar(message)
      clearMessage()
    }
  }, [message])

  return (
    <Paper className="form-wrapper">
      <FormControl
        className="add-product-form"
        margin="dense"
        required
        size="small"
        fullWidth
      >
        <FormHelperText
          className="product-add-helper"
        >Добавление товара</FormHelperText>
        <Select
          className="categories-select"
          value={form.category}
          onChange={changeInputHandler}
          name="category"
          displayEmpty
          variant="outlined"
          size="small"
          disabled={categoriesLoading}
          fullWidth
        >
          <MenuItem value="" disabled>
            Выберите категорию
            </MenuItem>
          {categories.map(item => {
            return (<MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>)
          })}
        </Select>
        <TextField
          fullWidth
          id="name"
          label="Название"
          variant="outlined"
          name="name"
          size="small"
          onChange={changeInputHandler}
          value={form.name}
        />
        <TextField
          fullWidth
          id="amount"
          label="Колличество"
          variant="outlined"
          name="amount"
          size="small"
          onChange={changeInputHandler}
          value={form.amount}
        />
        <TextField
          id="price"
          label="Цена"
          variant="outlined"
          name="price"
          size="small"
          onChange={changeInputHandler}
          value={form.price}
          fullWidth
        />
        <TextField
          id="description"
          label="Описание"
          variant="outlined"
          name="description"
          size="small"
          onChange={changeInputHandler}
          value={form.description}
          fullWidth
        />
        <TextField
          id="img"
          label="Изображение (url)"
          variant="outlined"
          name="img"
          size="small"
          onChange={changeInputHandler}
          value={form.img}
          fullWidth
        />
        <Button className="add-product-btn" variant="contained" color="primary" disabled={loading} onClick={addProductHandler}>Добавить</Button>
      </FormControl>
    </Paper>
  )
}

const mapStateToProps = state => {
  return {
    loading: state.productCreatorState.loading,
    err: state.productCreatorState.err,
    categories: state.categoriesState.categories,
    categoriesLoading: state.categoriesState.loading,
    message: state.productCreatorState.message
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addProductRequest: bindActionCreators(addProductRequestAction, dispatch),
    addProductFailure: bindActionCreators(addProductFailureAction, dispatch),
    getCategoriesRequest: bindActionCreators(getCategoriesRequestAction, dispatch),
    clearMessage: bindActionCreators(clearMessageAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCreator)