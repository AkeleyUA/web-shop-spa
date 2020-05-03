import React from 'react'
import AuthForm from '../components/AuthForm/AuthForm'
import { useHttp } from '../Hooks/http.hook'
import {CircularProgress} from '@material-ui/core'

export const AuthPage = () => {
  const { loading } = useHttp()

  if (loading) {
    return (<CircularProgress />)
  } else {
    return (
      <div className="row auth-page">
        <h1 className="title">Панель управления сайтом</h1>
        <AuthForm />
      </div>
    )
  }
}