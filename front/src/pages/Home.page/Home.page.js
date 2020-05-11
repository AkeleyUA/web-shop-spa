import React, {useEffect, useState} from 'react'
import NavBar from '../../components/NavBar/NavBar'
import Catalog from '../../components/Catalog/Catalog'
import { ToUpButton } from '../../components/ToUpButton/ToUpButton'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getCategoriesForClientRequestAction, getProductsForClientRequestAction } from './action'
import { changeCurrentPageAction } from '../../components/BottomNavBar/action'

const limit = 16

const HomePage = ({ getProductsForClientRequest, getCategoriesForClientRequest, currentCategory, currentPage, changeCurrentPage }) => {
  const containerRef = React.createRef()
  const currentPageIndex = currentPage - 1
  const [showScrollTo, setShowScrollTo] = useState(false)

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

  const handleScroll = () => {
    if (containerRef.current.scrollTop > 400) {
      setShowScrollTo(true)
    } else {
      setShowScrollTo(false)
    }
  }
  return  (
    <div ref={containerRef} className="scroll-container" onScroll={handleScroll}>
      <NavBar />
      <Catalog />
      <ToUpButton show={showScrollTo} containerRef={containerRef} />
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