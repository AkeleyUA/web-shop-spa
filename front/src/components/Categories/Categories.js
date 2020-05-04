import React, { useCallback, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {getCategoryRequestAction, deleteCategoryRequestAction, showCategoryOnWebSiteRequestAction} from './action'
import CategoryCreator from '../CategoryCreator/CategoryCreator'

import {
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  CircularProgress,
  Button,
  Checkbox,
  Icon,
  Paper,
  Breadcrumbs,
  Link
} from '@material-ui/core'
import { NavLink } from 'react-router-dom'

import './Categories.scss'


const BreadcrumbsCreator = [
  {
    name: 'Панель управления',
    path: '/admin'
  },
  {
    name: 'Категории',
    path: '/admin/categories',
    active: true
  },
]

const Categories = ({
  categories,
  getCategoryRequest,
  deleteCategoryRequest,
  showCategoryOnWebSiteRequest,
  oneCategoryLoading,
  loading,
  match
}) => {

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

  const Preloader = () => {
    return (
      <div className="preloader">
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="categories">
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {BreadcrumbsCreator.map(item => (
          <NavLink key={item.name} to={item.path} className={item.active ? 'active-link link' : 'link' }>{item.name}</NavLink>
        ))}
      </Breadcrumbs>
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
                    <Button
                    className="centered-btn"
                    onClick={() => {deleteCategoryRequest(row._id)}}
                    disabled={loading || oneCategoryLoading}
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
      <CategoryCreator />
    </div>
  )
}

const mapStateToProps = state => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(Categories)