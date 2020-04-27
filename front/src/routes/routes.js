import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { HomePage } from '../pages/Home.page'
import { AuthPage } from '../pages/Auth.page'
import { AdminPanelPage } from '../pages/AdminPanel.page'

export const useRoutes = (isAuth) => {
  return (
    <Switch>
      <Route path='/admin' exact component={ isAuth ? AdminPanelPage : AuthPage} />
      <Route path='/' exact component={HomePage} />
      <Redirect to='/' />
    </Switch>
  )
} 