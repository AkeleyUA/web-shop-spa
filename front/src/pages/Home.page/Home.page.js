import React, {useEffect} from 'react'
import NavBar from '../../components/NavBar/NavBar'
import Catalog from '../../components/Catalog/Catalog'
import { ToUpButton } from '../../components/ToUpButton/ToUpButton'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getCategoriesForClientRequestAction, getProductsForClientRequestAction } from './action'

const limit = 18
const currentPage = 0

const HomePage = ({  getProductsForClientRequest, getCategoriesForClientRequest, currentCategory  }) => {
  useEffect(() => {
    getCategoriesForClientRequest()
  }, [getCategoriesForClientRequest])

  useEffect(() => {
    if (currentCategory !== '') {
      getProductsForClientRequest(currentCategory, limit, currentPage)
    }
  }, [currentCategory])

  return  (
    <div >
      <NavBar />
      <Catalog />
      <ToUpButton />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentCategory: state.currentCategoryState.currentCategory,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCategoriesForClientRequest: bindActionCreators(getCategoriesForClientRequestAction, dispatch),
    getProductsForClientRequest: bindActionCreators(getProductsForClientRequestAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)