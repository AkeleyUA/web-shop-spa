import React, {useEffect} from 'react'
import NavBar from '../../components/NavBar/NavBar'
import Catalog from '../../components/Catalog/Catalog'
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar'
import { ToUpButton } from '../../components/ToUpButton/ToUpButton'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getCategoriesForClientRequestAction, getProductsForClientRequestAction } from './action'
import { changeCurrentPageAction } from '../../components/BottomNavBar/action'

const limit = 18

const HomePage = ({ getProductsForClientRequest, getCategoriesForClientRequest, currentCategory, currentPage, changeCurrentPage }) => {
  const currentPageIndex = currentPage - 1
  useEffect(() => {
    getCategoriesForClientRequest()
  }, [getCategoriesForClientRequest])

  useEffect(() => {
    if (currentCategory !== '') {
      getProductsForClientRequest(currentCategory, limit, currentPageIndex)
    }
  }, [currentCategory, currentPage])

  useEffect(() => {
    changeCurrentPage(1)
  }, [currentCategory])

  return  (
    <div >
      <NavBar />
      <Catalog />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentCategory: state.currentCategoryState.currentCategory,
    currentPage: state.paginationState.currentPage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCategoriesForClientRequest: bindActionCreators(getCategoriesForClientRequestAction, dispatch),
    getProductsForClientRequest: bindActionCreators(getProductsForClientRequestAction, dispatch),
    changeCurrentPage: bindActionCreators(changeCurrentPageAction, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)