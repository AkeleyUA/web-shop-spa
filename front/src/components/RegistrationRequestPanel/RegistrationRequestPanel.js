import React, { useEffect, useCallback, useState } from 'react'
import {
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Icon,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core'
import { useSnackbar } from 'notistack'
import { bindActionCreators } from 'redux'
import {
  getNotConfirmUsersRequestAction,
  clearMessageAction,
  confirmUserRequestAction,
  deleteUserRequestAction
} from './action'
import { Transition } from '../Transition'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './RegistrationRequestPanel.scss'
import Preloader from '../Preloader/Preloader'

const RegistrationRequestPanel = ({
  onDashboard = false,
  getNotConfirmUsersRequest,
  clearMessage,
  message,
  loading,
  users,
  confirmUserRequest,
  deleteUserRequest,
  oneUserLoading
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const [openDialog, setOpenDialog] = useState(false)
  const [currentUser, setCurrentUser] = useState({
    _id: '0',
    email: ''
  })
  const [action, setAction] = useState('')

  const getUsers = useCallback(() => {
    getNotConfirmUsersRequest()
  }, [getNotConfirmUsersRequest])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  useEffect(() => {
    if (message) {
      enqueueSnackbar(message)
      clearMessage()
    }
  }, [message, enqueueSnackbar, clearMessage])

  const openDialogHandler = (user, action) => {
    setAction(action)
    setCurrentUser(user)
    setOpenDialog(true)
  }

  const closeDialogHandler = () => {
    setOpenDialog(false)
    setAction('')
    setCurrentUser({ _id: '', email: '' })
  }

  const confirmUserHandler = () => {
    confirmUserRequest(currentUser._id)
    closeDialogHandler()
  }

  const deleteUserHandler = () => {
    deleteUserRequest(currentUser._id)
    closeDialogHandler()
  }
  
  return (
    <Grid
      container
      alignItems="center"
      justify="space-between"
      component={Paper}
      className="title-group"
    >
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeDialogHandler}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Подтвердите действие</DialogTitle>
        <DialogContent>
          {action === 'del'
            ? <DialogContentText>
              Отменить регистрацию пользователя <Typography component="span" display="inline" color="secondary">{currentUser.email}</Typography>?
              </DialogContentText>
            : <DialogContentText>
              Действительно предоставить доступ пользователю <Typography component="span" display="inline" color="secondary">{currentUser.email}</Typography>?
              </DialogContentText>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={action === 'del' ? deleteUserHandler : confirmUserHandler} color="primary">Подтвердить</Button>
          <Button onClick={closeDialogHandler} >Отменить</Button>
        </DialogActions>
      </Dialog>
      <Grid
        item
        lg={11}
        component={onDashboard ? Link : 'div'}
        to="/admin/confirm"
        className="not-link"
      >
        <Typography
          variant={onDashboard ? 'body1' : 'h6'}
        >
          Запросов в ождании подтверждения
        </Typography>
      </Grid>
      <Grid
        item
        lg={1}
        className="not-link"
        component={onDashboard ? Link : 'div'}
        to="/admin/confirm"
      >
        <Typography
          color={users.length > 0 ? 'secondary' : 'primary'}
          align="center"
          variant={onDashboard ? 'h6' : 'h5'}
        >
          {users.length}
        </Typography>
      </Grid>
      {
        !onDashboard
        && <Grid
          item
          lg={12}
          className="users-main-group"
        >
          <Divider className="users-confirm-divider" />
          {loading
            ? <Preloader />
            : <List style={{ width: '100%' }}>
              {users.map(user => (
                <ListItem
                  className="user-item"
                  key={user._id}
                  component={Paper}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt="avatar-no-confirm-user"
                    >
                      ?
                </Avatar>
                  </ListItemAvatar>
                  <ListItemText>
                    <Typography variant="body1">{user.email}</Typography>
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => openDialogHandler(user, 'confirm')}
                      color="primary"
                      disabled={oneUserLoading === user._id ? true : false}
                    >
                      <Icon>check</Icon>
                    </IconButton>
                    <IconButton
                      onClick={() => openDialogHandler(user, 'del')}
                      color="secondary"
                      disabled={oneUserLoading === user._id ? true : false}
                    >
                      <Icon>delete_outline</Icon>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
              }
            </List>
          }
          <Divider className="users-confirm-divider" />
        </Grid>
      }
    </Grid>
  )
}

const mapStateToProps = state => {
  return {
    users: state.registrationRequestState.users,
    loading: state.registrationRequestState.loading,
    message: state.registrationRequestState.message,
    oneUserLoading: state.registrationRequestState.oneUserLoading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNotConfirmUsersRequest: bindActionCreators(getNotConfirmUsersRequestAction, dispatch),
    clearMessage: bindActionCreators(clearMessageAction, dispatch),
    confirmUserRequest: bindActionCreators(confirmUserRequestAction, dispatch),
    deleteUserRequest: bindActionCreators(deleteUserRequestAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationRequestPanel)