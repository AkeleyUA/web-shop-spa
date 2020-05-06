import React, { useState, useEffect } from 'react'
import { registrationRequestAction, loginRequestAction } from './action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  TextField,
  Box,
  Button,
  Icon,
  Typography,
  IconButton,
  Paper,
  Fade,
  Popper,
  FormControl,
  ButtonGroup
} from '@material-ui/core'
import { useSnackbar } from 'notistack'

import './AuthForm.scss'


const AuthForm = ({ registrationRequest, loginRequest, loading, message }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState()
  const [err, setErr] = useState(
    { email: false, password: false }
  )
  const [form, setForm] = useState(
    { email: '', password: '' }
  )

  const changeInputHandler = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
    setErr({
      ...err,
      [event.target.name]: (event.target.value.length > 0 ? false : true)
    })
  }

  const popperHandler = (event) => {
    setAnchorEl(event.currentTarget)
    setOpen(!open)
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
  }, [message, enqueueSnackbar])

  return (
    <div className="auth-page">
      <Popper open={open} anchorEl={anchorEl} placement="right" transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography className="popper-content" variant="body1">login: test1@mail.ru, password: 123456</Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Box className="container">
        <FormControl className="form-wrapper">
          <Typography variant="h3" className="title">
            LOGOtip
            <Typography variant="caption">
              админ
            </Typography>
          </Typography>
          <TextField
            error={err.email}
            className="auth-input"
            id="email"
            label="email"
            variant="outlined"
            name="email"
            type="email"
            inputProps={{ value: form.email }}
            onChange={changeInputHandler}
            required
          />
          <TextField
            error={err.password}
            className="auth-input"
            id="password"
            label="password"
            variant="outlined"
            name="password"
            type="password"
            onChange={changeInputHandler}
            inputProps={{ value: form.password }}
            required
          />
          <ButtonGroup variant="contained" className="button-wrapper">
            <Button
              color="primary"
              startIcon={<Icon>forward</Icon>}
              type="submit"
              onClick={loginHandler}
              disabled={loading}
            >
              Войти
            </Button>
            <Button
              color="primary"
              startIcon={<Icon>add_box</Icon>}
              type="submit"
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </Button>
            <Button onClick={popperHandler} className="login-helper" color="primary">
              <Icon>help_outline</Icon>
            </Button>
          </ButtonGroup>
        </FormControl>
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