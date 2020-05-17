import React, { useState, useEffect } from 'react'
import { registrationRequestAction, loginRequestAction, clearMessageAction } from './action'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Transition } from '../Transition'
import {
  TextField,
  Button,
  Icon,
  Typography,
  Paper,
  DialogContent,
  Dialog,
  FormControl,
  ButtonGroup,
  Grid,
  DialogTitle,
  DialogActions,
  ListItem,
  ListSubheader,
  ListItemText,
  List,
  Divider
} from '@material-ui/core'
import { useSnackbar } from 'notistack'

import './AuthForm.scss'


const AuthForm = ({ registrationRequest, loginRequest, loading, message, clearMessage }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [dialog, setDialog] = useState(false)
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

  const handleOpenDialog = () => {
    setDialog(true)
  }
  const handleCloseDialog = () => {
    setDialog(false)
  }

  const registerHandler = () => {
    registrationRequest(form)
  }

  const loginHandler = () => {
    loginRequest(form)
  }

  const keyPressHandler = event => {
    if (event.key === 'Enter') {
      loginRequest(form)
    }
  }

  useEffect(() => {
    if (message) {
      enqueueSnackbar(message)
      clearMessage()
    }
  }, [message, clearMessage, enqueueSnackbar])

  return (
    <div
      className="auth-page"
      onKeyPress={keyPressHandler}
    >
      <Dialog
        open={dialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Тестовые учётные записи</DialogTitle>
        <DialogContent>
          <List>
            <Divider />
            <ListItem>
              <ListItemText
                secondary={
                  <>
                    <Typography>login: cm1@mail.ru, password: 123456</Typography>
                    <Typography>login: cm2@mail.ru, password: 123456</Typography>
                  </>
                }
              >
                <Typography variant="caption" color="primary">Контент-менеджеры</Typography>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                secondary={
                  <>
                    <Typography>login: m1@mail.ru, password: 123456</Typography>
                    <Typography>login: m2@mail.ru, password: 123456</Typography>
                  </>
                }
              >
                <Typography variant="caption" color="primary">Модератор</Typography>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                secondary={
                  <>
                    <Typography>login: s1@mail.ru, password: 123456</Typography>
                  </>
                }
              >
                <Typography variant="caption" color="primary">Супервизор</Typography>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                secondary={
                  <>
                    <Typography>login: a1@mail.ru, password: 123456</Typography>
                  </>
                }
              >
                <Typography variant="caption" color="primary">Администратор</Typography>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText><Typography variant="caption" color="secondary">Можете создать свою, если хотите ^_^</Typography></ListItemText>
            </ListItem>
            <Divider />
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            Понятно
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container justify='center' alignContent='center' className="container">
        <Grid item xs={12} sm={8} md={6} lg={4} component={Paper}>
          <FormControl className="auth-form-wrapper">
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
                <Typography variant="button">Войти</Typography>
              </Button>
              <Button
                color="primary"
                startIcon={<Icon>add_box</Icon>}
                type="submit"
                onClick={registerHandler}
                disabled={loading}
              >
                <Typography variant="button">Регистрация</Typography>
              </Button>
              <Button
                onClick={handleOpenDialog}
                className="login-helper"
                color="secondary"
                disabled={loading}
              >
                <Icon>help_outline</Icon>
              </Button>
            </ButtonGroup>
          </FormControl>
        </Grid>
      </Grid>
    </div >
  )
}

const mapDispathToProps = (dispatch) => {
  return {
    registrationRequest: bindActionCreators(registrationRequestAction, dispatch),
    loginRequest: bindActionCreators(loginRequestAction, dispatch),
    clearMessage: bindActionCreators(clearMessageAction, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.authState.loading,
    message: state.authState.message
  }
}


export default connect(mapStateToProps, mapDispathToProps)(AuthForm)