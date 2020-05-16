import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  getProductsForAdminRequestAction,
  showOnWebSiteRequestAction,
  deleteProductRequestAction,
  searchProductForAdminRequestAction,
  changePageAction,
  showOnPopularRequestAction
} from './action'

import {
  Icon,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Paper,
  IconButton
} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { useSnackbar } from 'notistack'
import Preloader from '../Preloader/Preloader'
import ProductFilter from '../ProductsFilter/ProductsFilter'

import './Products.Admin.scss'

const limit = 16

const ProductsForAdmin = ({
  loading,
  products,
  getProductsForAdminRequest,
  showOnWebSiteRequest,
  showOnPopularRequest,
  oneProductLoading,
  deleteProductRequest,
  message,
  productsLength,
  search,
  searchProductForAdminRequest,
  changePage,
  currentPage,
  accessLevel
}) => {
  const { enqueueSnackbar } = useSnackbar()


  useEffect(() => {
    if (search) {
      searchProductForAdminRequest(search, limit, currentPage - 1)
    } else {
      getProductsForAdminRequest(limit, currentPage - 1)
    }
  }, [currentPage, search, searchProductForAdminRequest, getProductsForAdminRequest])

  useEffect(() => {
    if (message) {
      enqueueSnackbar(message)
    }
  }, [message, enqueueSnackbar])

  const checkboxChangeHendler = (event) => {
    showOnWebSiteRequest(event.target.name, event.target.checked)
  }

  const checkboxChangePopularHendler = (event) => {
    showOnPopularRequest(event.target.name, event.target.checked)
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
              <TableCell >Имя товара</TableCell>
              <TableCell>Категория</TableCell>
              <TableCell align="center">Количество</TableCell>
              <TableCell align="center">Цена</TableCell>
              <TableCell align="center">Скидка</TableCell>
              {accessLevel > 1 && <TableCell align="center">Отображать на сайте</TableCell>}
              {accessLevel > 1 && <TableCell align="center">Отображать в популярном</TableCell>}
              {accessLevel === 1 && <TableCell align="center">Редактировать</TableCell>}
              {accessLevel > 1 && <TableCell align="center">Удалить</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(row => {
              return (
                <TableRow key={row._id}>
                  <TableCell >{row.name}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell align="center">{row.amount}</TableCell>
                  <TableCell align="center">{row.price}</TableCell>
                  <TableCell align="center">{row.sale}</TableCell>
                  {accessLevel > 1 &&
                    <TableCell align="center">
                      <Checkbox
                        disabled={oneProductLoading === row._id}
                        color="primary"
                        name={row._id}
                        checked={row.show}
                        onChange={checkboxChangeHendler} />
                    </TableCell>
                  }
                  {accessLevel > 1 &&
                    <TableCell align="center">
                      <Checkbox
                        disabled={oneProductLoading === row._id}
                        color="primary"
                        name={row._id}
                        checked={row.popular}
                        onChange={checkboxChangePopularHendler}
                      />
                    </TableCell>
                  }
                  {accessLevel === 1 &&
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
                  }
                  {accessLevel > 1 &&
                    <TableCell align="center">
                      <IconButton
                        onClick={() => { deleteHandler(row._id) }}
                        disabled={oneProductLoading === row._id}
                      >
                        <Icon>delete_outline</Icon>
                      </IconButton>
                    </TableCell>
                  }
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
      {productsLength > 16
        ? <Pagination
          className="admin-table-pagintaion"
          page={currentPage}
          count={Math.ceil(productsLength / 16)}
          color="secondary"
          onChange={changePageHandler}
        />
        : null}
    </Paper>
  )
}

const mapStateToProps = state => {
  return {
    loading: state.adminProductsState.loading,
    products: state.adminProductsState.products,
    message: state.adminProductsState.message,
    oneProductLoading: state.adminProductsState.oneProductLoading,
    productsLength: state.adminProductsState.productsLength,
    search: state.adminProductsState.search,
    currentPage: state.adminProductsState.currentPage,
    accessLevel: state.authState.token.accessLevel
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProductsForAdminRequest: bindActionCreators(getProductsForAdminRequestAction, dispatch),
    showOnWebSiteRequest: bindActionCreators(showOnWebSiteRequestAction, dispatch),
    showOnPopularRequest: bindActionCreators(showOnPopularRequestAction, dispatch),
    deleteProductRequest: bindActionCreators(deleteProductRequestAction, dispatch),
    searchProductForAdminRequest: bindActionCreators(searchProductForAdminRequestAction, dispatch),
    changePage: bindActionCreators(changePageAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsForAdmin)