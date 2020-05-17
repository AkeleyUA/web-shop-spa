import React, { useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getCategoriesRequestAction, deleteCategoryRequestAction, showCategoryOnWebSiteRequestAction, clearMessageAction } from './action'

import {
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  CircularProgress,
  IconButton,
  Checkbox,
  Icon,
  Paper,
} from '@material-ui/core'

import './Categories.Admin.scss'
import { useSnackbar } from 'notistack'
import CategoryCreator from '../CategoryCreator/CategoryCreator'

const CategoriesForAdmin = ({
  categories,
  getCategoriesRequest,
  deleteCategoryRequest,
  showCategoryOnWebSiteRequest,
  oneCategoryLoading,
  loading,
  message,
  clearMessage
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const showCategoryOnWebSiteHendler = (id, checked) => {
    showCategoryOnWebSiteRequest(id, checked)
  }

  const getCategories = useCallback(
    () => {
      getCategoriesRequest()
    },
    [getCategoriesRequest],
  )

  useEffect(() => {
    getCategories()
  }, [getCategories])

  useEffect(() => {
    if (message) {
      enqueueSnackbar(message)
      clearMessage()
    }
  }, [message, enqueueSnackbar, clearMessage])

  const Preloader = () => {
    return (
      <div className="preloader">
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="categories">
      <TableContainer className="table-container" component={Paper}>
        <Table stickyHeader size="small" aria-label="a categories table">
          <TableHead className="table-headers">
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Название категории</TableCell>
              <TableCell align="center">Отображать на сайте</TableCell>
              <TableCell align="center">Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map(row => {
              return (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    {row._id}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="center">
                    <Checkbox
                      color="primary"
                      name={row._id}
                      checked={row.show || false}
                      onChange={(event) => {
                        showCategoryOnWebSiteHendler(row._id, event.target.checked)
                      }}
                      disabled={loading || oneCategoryLoading || row.name === 'Все'}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      className="centered-btn"
                      onClick={() => { deleteCategoryRequest(row._id) }}
                      disabled={loading || oneCategoryLoading || row.name === 'Все'}
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
      <CategoryCreator />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    message: state.adminCategoriesState.message,
    categories: state.adminCategoriesState.categories,
    loading: state.adminCategoriesState.loading,
    oneCategoryLoading: state.categoryCreatorState.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCategoriesRequest: bindActionCreators(getCategoriesRequestAction, dispatch),
    deleteCategoryRequest: bindActionCreators(deleteCategoryRequestAction, dispatch),
    showCategoryOnWebSiteRequest: bindActionCreators(showCategoryOnWebSiteRequestAction, dispatch),
    clearMessage: bindActionCreators(clearMessageAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesForAdmin)