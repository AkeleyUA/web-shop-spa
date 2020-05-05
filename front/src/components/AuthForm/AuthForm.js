import React, { useState, useEffect } from 'react'
import { registrationRequestAction, loginRequestAction } from './action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { TextField, Box, Button, Icon, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'

import './AuthForm.scss'


const AuthForm = ({ registrationRequest, loginRequest, loading, message }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState(
    { email: '', password: '' }
  )

  const changeInputHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = () => {
    registrationRequest(form)
  }

  const loginHandler = () => {
    loginRequest(form)
  }

  useEffect(() => {
    if (message) {
      enqueueSnackbar(message)
    }
  }, [message])

  return (
    <div className="auth-page">
      <Typography variant="h3" className="title">
        LOGOtip
        <Typography variant="caption">
          админ
        </Typography>
      </Typography>
      <Box className="container">
        <Box className="form-wrapper">
          <TextField
            className="auth-input"
            id="email"
            label="email"
            variant="outlined"
            name="email"
            type="email"
            onChange={changeInputHandler}
          />
          <TextField
            className="auth-input"
            id="password"
            label="password"
            variant="outlined"
            name="password"
            type="password"
            onChange={changeInputHandler}
          />
          <Box className="button-wrapper">
            <Button
              variant="contained"
              color="primary"
              startIcon={<Icon>forward</Icon>}
              type="submit"
              onClick={loginHandler}
              disabled={loading}
            >
              Войти
          </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Icon>add_box</Icon>}
              type="submit"
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
          </Button>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

const mapDispathToProps = (dispatch) => {
  return {
    registrationRequest: bindActionCreators(registrationRequestAction, dispatch),
    loginRequest: bindActionCreators(loginRequestAction, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.authState.loading,
    message: state.authState.message
  }
}


export default connect(mapStateToProps, mapDispathToProps)(AuthForm);