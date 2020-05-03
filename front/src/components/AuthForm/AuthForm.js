import React, { useState } from 'react'
import { registrationAction, loginAction } from './action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import { TextField, Box, Button, Icon } from '@material-ui/core'


import './AuthForm.scss'


const AuthForm = ({ registration, login, loading }) => {
  const [form, setForm] = useState(
    { email: '', password: '' }
  )

  const changeInputHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = () => {
    registration(form)
  }

  const loginHandler = () => {
    login(form)
  }

  return (
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
  )
}

const mapDispathToProps = (dispatch) => {
  return {
    registration: bindActionCreators(registrationAction, dispatch),
    login: bindActionCreators(loginAction, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.authState.loading
  }
}


export default connect(mapStateToProps, mapDispathToProps)(AuthForm);