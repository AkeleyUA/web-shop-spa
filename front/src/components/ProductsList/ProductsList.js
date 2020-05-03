import React, { useEffect, useCallback, useState} from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  callToastAction
} from '../Toast/action'

import {
  getProductsRequestAction,
  showOnWebSiteRequestAction,
} from './action'

import {
  CircularProgress,
  FormControl,
  InputLabel,
  InputAdornment,
  Input,
  Icon,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Checkbox,
  Paper
} from '@material-ui/core'

import './ProductsList.scss'


const ProductsList = ({
  loading,
  products,
  error,
  getProductsRequest,
  callToast,
  showOnWebSiteRequest,
  oneProductLoading,
}) => {

  const [value, setValue] = useState('')

  const getProducts = useCallback(() => {
    getProductsRequest()
  }, [])

  useEffect(() => {
    getProducts()
  }, [])

  const inputFilterHandler = (event) => {
    setValue(event.target.value)
  }

  const checkboxChangeHendler = (event) => {
    showOnWebSiteRequest(event.target.name, event.target.checked)
  }

  const Preloader = () => {
    return (
      <div className="preloader">
        <CircularProgress />
      </div>
    )
  }

  const TableCreator = () => {
    return (
      <TableContainer className="table-container" component={Paper}>
        <Table stickyHeader size="small" aria-label="a products table">
          <TableHead className="table-headers">
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell >Имя товара</TableCell>
              <TableCell >Количество</TableCell>
              <TableCell >Цена</TableCell>
              <TableCell >Описание</TableCell>
              <TableCell >Отображать на сайте</TableCell>
              <TableCell >Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.filter(row => row.name.match(value)).map(row => {
              return (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    {row._id}
                  </TableCell>
                  <TableCell >{row.name}</TableCell>
                  <TableCell >{row.amount}</TableCell>
                  <TableCell >{row.price}</TableCell>
                  <TableCell >{row.description}</TableCell>
                  <TableCell align="center">
                    {(
                      oneProductLoading === row._id
                        ? <Preloader />
                        : <Checkbox color="primary" name={row._id} checked={row.show} onChange={checkboxChangeHendler} />
                    )}
                  </TableCell>
                  <TableCell aling="center">
                    <Button>
                      <Icon>clear</Icon>
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }


  if (error) {
    callToast(error, "error")
  }
  return (
    <div className="products-list">
      <FormControl>
        <InputLabel htmlFor="input-with-icon-search">Введите имя товара</InputLabel>
        <Input
          id="input-with-icon-search"
          onChange={inputFilterHandler}
          startAdornment={
            <InputAdornment position="start">
              <Icon>search</Icon>
            </InputAdornment>
          }
        />
      </FormControl>
      {loading ? <Preloader /> : <TableCreator />}
      <NavLink to="/admin/products/add">Добавить</NavLink>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    loading: state.productsState.loading,
    products: state.productsState.products,
    error: state.productsState.error,
    oneProductLoading: state.productsState.oneProductLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProductsRequest: bindActionCreators(getProductsRequestAction, dispatch),
    callToast: bindActionCreators(callToastAction, dispatch),
    showOnWebSiteRequest: bindActionCreators(showOnWebSiteRequestAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList)