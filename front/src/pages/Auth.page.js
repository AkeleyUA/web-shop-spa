import React from 'react'
import {AuthForm} from '../components/AuthForm/AuthForm'

export const AuthPage = () => {
  return  (
    <div className="row auth-page">
      <h1 className="title">Панель управления сайтом</h1>
      <AuthForm />
    </div>
  )
}