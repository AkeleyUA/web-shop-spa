import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import HomePage from '../pages/Home.page/Home.page'
import { AuthPage } from '../pages/Auth.page'
import AdminPanelPage from '../pages/AdminPanel.page'
import Categories from '../components/Categories/Categories'
import ProductCreator from '../components/ProductCreator/ProductCreator'
import ProductsList from '../components/ProductsList/ProductsList'
import { connect } from 'react-redux'

const Routes = ({isAuth}) => {
  return (
    <Switch>
      <Route path='/admin' exact component={ isAuth ? AdminPanelPage : AuthPage} />
      <Route path='/admin/products' exact component={ isAuth ? ProductsList : AuthPage} />
      <Route path='/admin/products/add' exact component={ isAuth ? ProductCreator : AuthPage} />
      <Route path='/admin/categories' exact component={ isAuth ? Categories : AuthPage} />
      <Route path='/' exact component={HomePage} />
      <Redirect to='/' />
    </Switch>
  )
} 
const mapStateToProps = state => {
  return {
    isAuth: state.authState.isAuth
  }
}

export default connect(mapStateToProps)(Routes)