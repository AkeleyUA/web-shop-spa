import React, { useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
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
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { bindActionCreators } from 'redux'
import { getProductForEditRequestAction, clearMessageAction, saveChangeProductRequestAction } from './action'
import { getCategoriesRequestAction } from '../Categories.Admin/action'
import { useSnackbar } from 'notistack'
import Preloader from '../Preloader/Preloader'
import { Transition } from '../Transition'

import './ProductEditor.scss'

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
  categories,
  saveChangeRequest
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const [isChange, setIsChange] = useState([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    name: '',
    price: 0,
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1280px-No_image_3x4.svg.png',
    category: '',
    amount: 0,
    description: '',
    sale: 0
  })

  const getCategories = useCallback(() => {
    getCategoriesRequest()
  }, [getCategoriesRequest])

  useEffect(() => {
    getProductForEditorRequest(location.state.id)
    getCategories()
  }, [location.state.id])

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
      case 'popular': return false
      default: return true
    }
  })

  const saveFormHandler = () => {
    saveChangeRequest(form, product._id)
    setIsChange(false)
  }

  const changeInputHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
    setIsChange([...isChange, event.target.name])
  }

  const resetHandler = event => {
    setForm({ ...form, [event.currentTarget.name]: product[event.currentTarget.name] })
    setIsChange(isChange.filter(name => name !== event.currentTarget.name))
  }

  const resetControler = (item) => {
    if (item !== 'category' && product[item] !== form[item]) {
      return (
        <IconButton size="small" name={item} onClick={resetHandler}><Icon fontSize="small">restore</Icon></IconButton>
      )
    }
  }
  const openDialogHandler = () => {
    setOpen(true)
  }
  const closeDialogHandler = () => {
    setOpen(false)
  }

  return (
    <Grid container component={Paper}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeDialogHandler}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Отменить изменения?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            После отмены введённые изменения не сохраняться
            <Typography variant="caption">*Может они где-то и сохраняться, но точно не тут ^_^</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button component={Link} to='/admin/products' color="primary">Подтвердить</Button>
          <Button onClick={closeDialogHandler}>Отменить</Button>
        </DialogActions>
      </Dialog>
      {loading
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
                    {categories.filter(option => option.name !== 'Все').map((option) => (
                      <MenuItem key={option._id} value={option.name} disabled={!option.show}>
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
                {form.sale > 0
                  ? <div className="price">
                    <Typography className="onld-price" variant="caption">{Number(form.price).toFixed(2)} &#8372;</Typography>
                    <Typography variant="h4" color="secondary">{(form.price - (form.price * (form.sale / 100))).toFixed(2)} &#8372;</Typography>
                  </div>
                  : <div className="price">
                    <Typography variant="h4" color="primary">{Number(form.price).toFixed(2)} &#8372;</Typography>
                  </div>
                }
                <IconButton color="primary"><Icon>shopping_cart</Icon></IconButton>
              </CardActions>
            </Card>
          </Grid>
        </>
      }
      <Grid item lg={12}>
        <Toolbar>
          {isChange.length > 0
            ? <Button
              onClick={openDialogHandler}
              style={{marginRight: 15}}
            >
              Отменить
              </Button>
            : <Button
              component={Link}
              to="/admin/products"
            >
              Назад к продуктам
            </Button>
          }

          <Button
            variant='contained'
            color="primary"
            disabled={!isChange.length > 0}
            onClick={saveFormHandler}
          >
            Сохранить
          </Button>
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
    saveChangeRequest: bindActionCreators(saveChangeProductRequestAction, dispatch)
  }
}

export default connect(mapStateToPRops, mapDispatchToProps)(ProductEditor)