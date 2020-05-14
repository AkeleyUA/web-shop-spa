import React, { useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import {
  Paper,
  TextField,
  Toolbar,
  Button,
  IconButton,
  Icon,
  FormControl,
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
  CardMedia,
  Box,
  MenuItem,
  FormHelperText
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { bindActionCreators } from 'redux'
import { getProductForEditRequestAction, clearMessageAction } from './action'
import { useSnackbar } from 'notistack'
import Preloader from '../Preloader/Preloader'

import './ProductEditor.scss'
import { getCategoriesRequestAction } from '../Categories.Admin/action'


const labels = [
  {
    name: 'name',
    label: 'Имя продукта'
  },
  {
    name: 'category',
    label: 'Категория'
  },
  {
    name: 'price',
    label: 'Цена'
  },
  {
    name: 'img',
    label: 'Изображение'
  },
  {
    name: 'description',
    label: 'Описание'
  },
  {
    name: 'amount',
    label: 'Количество'
  },
  {
    name: 'sale',
    label: 'Скидка'
  },
]

const ProductEditor = ({
  location,
  getProductForEditorRequest,
  product,
  message,
  clearMessage,
  loading,
  getCategoriesRequest,
  categories
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const [form, setForm] = useState({
    name: '',
    price: '',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1280px-No_image_3x4.svg.png',
    category: 'Популярно',
    amount: '',
    description: '',
    sale: ''
  })

  const getCategories = useCallback(
    () => {
      getCategoriesRequest()
    },
    [getCategoriesRequest],
  )
  useEffect(() => {
    getProductForEditorRequest(location.state.id)
    getCategories()
  }, [getCategories, getProductForEditorRequest, location.state.id])

  useEffect(() => {
    if (product.name) {
      setForm({
        name: product.name,
        price: product.price,
        img: product.img,
        category: product.category,
        amount: product.amount,
        description: product.description,
        sale: product.sale
      })
    }
  }, [product])

  useEffect(() => {
    if (message) {
      enqueueSnackbar(message)
      clearMessage()
    }
  }, [message, enqueueSnackbar, clearMessage])

  const productKeys = Object.keys(product).filter(key => {
    switch (key) {
      case '_id': return false
      case '__v': return false
      case 'show': return false
      default: return true
    }
  })

  const resetFormHamdler = () => {
    setForm({
      name: product.name,
      price: product.price,
      img: product.img,
      category: product.category,
      amount: product.amount,
      description: product.description,
      sale: product.sale
    })
  }

  const saveFormHandler = () => {

  }

  const changeInputHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const resetHandler = event => {
    setForm({ ...form, [event.currentTarget.name]: product[event.currentTarget.name] })
  }

  const resetControler = (item) => {
    if (item !== 'category' && product[item] !== form[item]) {
      return (
        <IconButton size="small" name={item} onClick={resetHandler}><Icon fontSize="small">restore</Icon></IconButton>
      )
    }
  }

  return (
    <Grid container component={Paper}>
      {loading && form.category === undefined
        ? <Preloader />
        :
        <>
          <Grid item lg={6}>
            <Box className="product-editor-form-wrapper">
              <FormControl
                fullWidth
                className="product-editor-form"
              >
                <FormHelperText>Информация о товаре</FormHelperText>
                {productKeys.map(item => (item === 'category'
                  ? <TextField
                    select
                    label={labels.find(label => label.name === item).label}
                    name={item}
                    key={item}
                    value={form[item]}
                    onChange={changeInputHandler}
                    InputProps={{
                      endAdornment: resetControler(item)
                    }}
                  >
                    {categories.map((option) => (
                      <MenuItem key={option._id} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  : <TextField
                    label={labels.find(label => label.name === item).label}
                    name={item}
                    key={item}
                    value={form[item]}
                    onChange={changeInputHandler}
                    InputProps={{
                      endAdornment: resetControler(item)
                    }}
                  />
                ))}
              </FormControl>
            </Box>
          </Grid>
          <Grid item lg={6} className="product-editor-card">
            <Card
              className="card"
              variant="outlined"
            >
              <CardMedia
                className="card-img"
                title={form.name}
              >
                <img
                  width="100%"
                  height="100%"
                  src={form.img}
                  alt={`${form.name}-img`}
                />
              </CardMedia>
              <CardContent className="card-content">
                <Typography className="card-content-text" gutterBottom variant="subtitle1">
                  {form.name}
                </Typography>
                <Box component="div" className="ratingBtn">
                  <Rating
                    size="small"
                    name="rating"
                    value={5}
                    disabled
                  />
                  <Typography component="legend" variant="caption">&nbsp;Отзывов: 0</Typography>
                </Box>
              </CardContent>
              <CardActions
                disableSpacing={true}
              >
                <Typography variant="h4" color="primary">{form.price} &#8372;</Typography>
                <IconButton color="primary"><Icon>shopping_cart</Icon></IconButton>
              </CardActions>
            </Card>
          </Grid>
        </>
      }
      <Grid item lg={12}>
        <Toolbar>
          <Button onClick={resetFormHamdler}>Отменить</Button>
          <Button onClick={saveFormHandler}>Сохранить</Button>
        </Toolbar>
      </Grid>
    </Grid>
  )
}

const mapStateToPRops = state => {
  return {
    product: state.editState.product,
    message: state.editState.message,
    loading: state.editState.loading,
    categories: state.adminCategoriesState.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProductForEditorRequest: bindActionCreators(getProductForEditRequestAction, dispatch),
    clearMessage: bindActionCreators(clearMessageAction, dispatch),
    getCategoriesRequest: bindActionCreators(getCategoriesRequestAction, dispatch),
  }
}

export default connect(mapStateToPRops, mapDispatchToProps)(ProductEditor)