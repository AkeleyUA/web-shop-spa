import React, { useState, useEffect, useContext } from 'react'
import {useHttp} from '../../Hooks/http.hook'
import {useMessage} from '../../Hooks/message.hook'
import { AuthContext } from '../../context/AuthContext'
import './AuthForm.scss'


export const  AuthForm = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, err, request, clearErr} = useHttp()
  const [form, setForm] = useState(
    {email:'', password: ''}
  )
  
  useEffect(() => {
    message(err)
    clearErr()
  }, [err, message, clearErr])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])


  const changeInputHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }
  
  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  return (
    <div className="col s6 offset-s3">
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <div className="input-field">
            <input 
              id="email"
              type="email"
              name="email"
              className="validate"
              onChange={changeInputHandler}
            />
            <label htmlFor="email">Email</label>
          </div>
            <div className="input-field">
              <input
                id="password"
                type="password"
                name="password"
                className="validate"
                onChange={changeInputHandler}
              />
              <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="card-action">
          <div className="container">
            <div className="row">
              <div className="col">
                <button 
                  className="btn waves-effect waves-light"
                  type="submit"
                  name="action"
                  onClick={loginHandler}
                  disabled={loading}
                >
                  Войти
                  <i className="material-icons right">forward</i>
                </button>
              </div>
              <div className="col">
                <button
                  className="btn waves-effect waves-light"
                  type="submit"
                  name="action"
                  onClick={registerHandler}
                  disabled={loading}
                >
                  Регистрация
                  <i className="material-icons right">add_box</i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}