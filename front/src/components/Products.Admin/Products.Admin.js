import React, { useEffect, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  getProductsRequestAction,
  showOnWebSiteRequestAction,
  deleteProductRequestAction,
  changePageAction,
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
  Paper,
  IconButton
} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
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
  message,
  productsLength,
  currentPage,
  changePage
}) => {
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    getProductsRequest(18, currentPage - 1)
  }, [currentPage])

  useEffect(() => {
    if (message) {
      enqueueSnackbar(message)
    }
  }, [message])

  const checkboxChangeHendler = (event) => {
    showOnWebSiteRequest(event.target.name, event.target.checked)
  }

  const deleteHandler = (id) => {
    deleteProductRequest(id)
  }

  const changePageHandler = (event, newValue) => {
    changePage(newValue)
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
              <TableCell align="center">Отображать на сайте</TableCell>
              <TableCell align="center">Редактировать</TableCell>
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
                  <TableCell align="center">
                    <Checkbox disabled={oneProductLoading === row._id} color="primary" name={row._id} checked={row.show} onChange={checkboxChangeHendler} />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      component={Link}
                      to={{
                        pathname: `/admin/product/${row._id}`,
                        state: { id: row._id }
                      }}
                      disabled={oneProductLoading === row._id}
                    >
                      <Icon>edit</Icon>
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => { deleteHandler(row._id) }}
                      disabled={oneProductLoading === row._id}
                    >
                      <Icon>delete_outline</Icon>
                    </IconButton>
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
      {loading ? <Preloader className="preloader" /> : <TableCreator />}
      {productsLength > 18
        ? <Pagination
          className="admin-table-pagintaion"
          value={currentPage}
          count={Math.ceil(productsLength / 18)}
          color="secondary"
          onChange={changePageHandler}
        />
        : null}
    </Paper>
  )
}

const mapStateToProps = state => {
  return {
    loading: state.productsState.loading,
    products: state.productsState.products,
    message: state.productsState.message,
    oneProductLoading: state.productsState.oneProductLoading,
    productsLength: state.productsState.productsLength,
    currentPage: state.productsState.currentPage,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProductsRequest: bindActionCreators(getProductsRequestAction, dispatch),
    showOnWebSiteRequest: bindActionCreators(showOnWebSiteRequestAction, dispatch),
    deleteProductRequest: bindActionCreators(deleteProductRequestAction, dispatch),
    changePage: bindActionCreators(changePageAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsForAdmin)