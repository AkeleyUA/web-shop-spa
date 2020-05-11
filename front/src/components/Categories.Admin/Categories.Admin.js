import React, { useCallback, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {getCategoryRequestAction, deleteCategoryRequestAction, showCategoryOnWebSiteRequestAction} from './action'

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

const CategoriesForAdmin = ({
  categories,
  getCategoryRequest,
  deleteCategoryRequest,
  showCategoryOnWebSiteRequest,
  oneCategoryLoading,
  loading,
  message,
}) => {
  
  const {enqueueSnackbar} = useSnackbar()

  const getCategory = useCallback(
    () => {
      getCategoryRequest()
    },
    [categories],
  )

  const showCategoryOnWebSiteHendler = (id, checked) => {
    showCategoryOnWebSiteRequest(id, checked)
  }

  useEffect(() => {
    getCategory()
  }, [])

  useEffect(() => {
    if (message) {
      enqueueSnackbar(message)
    }
  }, [message])

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
                    {(
                      '123' === row._id
                        ? <Preloader />
                        : <Checkbox
                        color="primary"
                        name={row._id}
                        checked={row.show || false}
                        onChange={(event) => {
                          showCategoryOnWebSiteHendler(row._id, event.target.checked)
                        }}
                        disabled={loading || oneCategoryLoading}
                      />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                    className="centered-btn"
                    onClick={() => {deleteCategoryRequest(row._id)}}
                    disabled={loading || oneCategoryLoading}
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
    </div>
  )
}

const mapStateToProps = state => {
  return {
    message: state.categoriesState.message,
    categories: state.categoriesState.categories,
    loading: state.categoriesState.loading,
    oneCategoryLoading: state.categoryCreatorState.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCategoryRequest: bindActionCreators(getCategoryRequestAction, dispatch),
    deleteCategoryRequest: bindActionCreators(deleteCategoryRequestAction, dispatch),
    showCategoryOnWebSiteRequest: bindActionCreators(showCategoryOnWebSiteRequestAction, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesForAdmin)