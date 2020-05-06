import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import HomePage from '../pages/Home.page/Home.page'
import AuthPage from '../pages/Auth.page'
import DeveloperPage from '../pages/Developer.page'
import AdminPanelPage from '../pages/AdminPanel.page'
import Categories from '../components/Categories/Categories'
import ProductCreator from '../components/ProductCreator/ProductCreator'
import ProductsList from '../components/ProductsList/ProductsList'
import AdminDashboard from '../components/AdminDashboard/AdminDashboard'
import { connect } from 'react-redux'

const WithOutRoutes = ({ isAuth }) => {
  return (
    <Switch>
      <Route path='/admin' component={isAuth ? AdminPanelPage : AuthPage}/>
      <Route path='/developer' exact component={DeveloperPage} />
      <Route path='/' exact component={HomePage} />
      <Redirect to='/' />
    </Switch>
  )
}

export const WithOutAdminRoutes = ({ isAuth }) => {
  if (isAuth) {
    return (
      <Switch>
        <Route path='/admin/dashboard' exact component={AdminDashboard} />
        <Route path='/admin/products' exact component={ProductsList} />
        <Route path='/admin/products/add' exact component={ProductCreator} />
        <Route path='/admin/categories' exact component={Categories} />
        <Redirect to='/admin/dashboard' />
      </Switch>
    )
  } else {
    return (
      <Switch>
        <Redirect to='/admin'/>
      </Switch>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.authState.isAuth
  }
}

export const Routes = connect(mapStateToProps)(WithOutRoutes)
export const AdminRoutes = connect(mapStateToProps)(WithOutAdminRoutes)