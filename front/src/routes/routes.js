import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import HomePage from '../pages/Home.page'
import AuthPage from '../pages/Auth.page'
import DeveloperPage from '../pages/Developer.page'
import AdminPanelPage from '../pages/AdminPanel.page'
import CategoriesForAdmin from '../components/Categories.Admin/Categories.Admin'
import ProductsForAdmin from '../components/Products.Admin/Products.Admin'
import AdminDashboard from '../components/AdminDashboard/AdminDashboard'
import OrderPage from '../pages/Order.page'
import { connect } from 'react-redux'
import ProductEditor from '../components/ProductEditor/ProductEditor'
import AccessChangePanel from '../components/AccessChangePanel/AccessChangePanel'

const WithOutConnectRoutes = ({ isAuth }) => {
  return (
    <Switch>
      <Route path='/admin' component={isAuth ? AdminPanelPage : AuthPage}/>
      <Route path='/developer' exact component={DeveloperPage} />
      <Route path='/order' exact component={OrderPage} />
      <Route path='/' exact component={HomePage} />
      <Redirect to='/' />
    </Switch>
  )
}

export const WithOutConnectAdminRoutes = ({ isAuth }) => {
  if (isAuth) {
    return (
      <Switch>
        <Route path='/admin/dashboard' exact component={AdminDashboard} />
        <Route path='/admin/products' exact component={ProductsForAdmin} />
        <Route path='/admin/product/:id' exact component={ProductEditor} />
        <Route path='/admin/categories' exact component={CategoriesForAdmin} />
        <Route path='/admin/access' exact component={AccessChangePanel} />
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

export const Routes = connect(mapStateToProps)(WithOutConnectRoutes)
export const AdminRoutes = connect(mapStateToProps)(WithOutConnectAdminRoutes)