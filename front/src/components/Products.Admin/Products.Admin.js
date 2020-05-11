import React, { useEffect, useCallback, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  getProductsRequestAction,
  showOnWebSiteRequestAction,
  deleteProductRequestAction,
} from './action'

import {
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
import { useSnackbar } from 'notistack'
import Preloader from '../Preloader/Preloader'
import ProductFilter from '../ProductsFilter/ProductsFilter'

import './Products.Admin.scss'

const ProductsForAdmin = ({
  loading,
  products,
  getProductsRequest,
  showOnWebSiteRequest,
  oneProductLoading,
  deleteProductRequest,
  message
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const getProducts = useCallback(() => {
    getProductsRequest()
  }, [getProductsRequest])

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    if (message) {
      enqueueSnackbar(typeof message === "string" ? message : 'Неизвестная ошибка')
    }
  }, [message])

  const checkboxChangeHendler = (event) => {
    showOnWebSiteRequest(event.target.name, event.target.checked)
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
              <TableCell align="center">Отображать на сайте</TableCell>
              <TableCell align="center">Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(row => {
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
                    <Checkbox disabled={oneProductLoading === row.id} color="primary" name={row._id} checked={row.show} onChange={checkboxChangeHendler} />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => { deleteProductRequest(row._id) }}
                      disabled={oneProductLoading === row.id}
                    >
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

  return (
    <Paper className="products-list">
      <ProductFilter />
      {loading ? <Preloader /> : <TableCreator />}
    </Paper>
  )
}

const mapStateToProps = state => {
  return {
    loading: state.productsState.loading,
    products: state.productsState.products,
    message: state.productsState.message,
    oneProductLoading: state.productsState.oneProductLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProductsRequest: bindActionCreators(getProductsRequestAction, dispatch),
    showOnWebSiteRequest: bindActionCreators(showOnWebSiteRequestAction, dispatch),
    deleteProductRequest: bindActionCreators(deleteProductRequestAction, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsForAdmin)