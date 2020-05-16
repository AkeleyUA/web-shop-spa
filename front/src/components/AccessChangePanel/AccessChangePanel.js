import React, { useEffect, useCallback, useState } from 'react'
import { getUsersForAdminRequesAction, clearMessageAction, changeLevelRequestAction, deleteUserRequestAction } from './action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  List,
  ListItem,
  Grid,
  Paper,
  Avatar,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Icon,
  Select,
  MenuItem,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button
} from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Preloader from '../Preloader/Preloader'
import { useSnackbar } from 'notistack'
import { Transition } from '../Transition'

import './AccessChangePanel.scss'

export const levels = [
  {
    level: 1,
    icon: 'CM',
    label: 'Контент-менеджер'
  },
  {
    level: 2,
    icon: 'M',
    label: 'Модератор'
  },
  {
    level: 3,
    icon: 'S',
    label: 'Супервизор'
  },
  {
    level: 10,
    icon: 'A',
    label: 'Администратор'
  },
  {
    level: 100,
    icon: 'A',
    label: 'Администратор'
  },

]

const classes = {
  1: 'avatar-blue',
  2: 'avatar-green',
  3: 'avatar-red',
  10: 'avatar-orange'
}



const AccessChangePanel = ({
  getUsersForAdminReques,
  users,
  loading,
  message,
  clearMessage,
  oneUserLoading,
  changeLevelRequest,
  deleteUserRequest,
  accessLevel
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [deleteUser, setDeleteUser] = useState({
    email: ''
  })
  const [checkedUser, setCheckedUser] = useState({
    email: '',
    accessLevel: 1
  })
  const [inputValue, setInputValue] = useState('')
  const [selectValue, setSelectValue] = useState(1)


  const getUsers = useCallback(() => {
    getUsersForAdminReques()
  }, [getUsersForAdminReques])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  useEffect(() => {
    if (message) {
      enqueueSnackbar(message)
      clearMessage()
    }
  }, [message, enqueueSnackbar, clearMessage])

  const openEditDialogHandler = user => {
    setSelectValue(user.accessLevel)
    setCheckedUser(user)
    setOpenEditDialog(true)
  }

  const closeEditDialogHandler = () => {
    setOpenEditDialog(false)
    setCheckedUser({ email: '', accessLevel: 1 })
  }

  const openDeleteDialogHandler = user => {
    setDeleteUser(user)
    setOpenDeleteDialog(true)
  }

  const closeDeleteDialogHandler = () => {
    setOpenDeleteDialog(false)
    setDeleteUser({
      email: ''
    })
    setInputValue('')
  }

  const changeInputHandler = event => {
    setInputValue(event.currentTarget.value)
  }

  const changeLevelHandler = () => {
    changeLevelRequest(checkedUser._id, selectValue)
    closeEditDialogHandler()
  }

  const deleteUserHandler = () => {
    deleteUserRequest(deleteUser._id)
    closeDeleteDialogHandler()
  }

  if (loading) {
    return <Preloader />
  }
  return (
    <div className="access-change-panel">
      <Grid container spacing={4} component={Paper}>
        <Grid item lg={12}>
          {levels.filter(item => item.level !== 100).map(level => (
            <ExpansionPanel key={level.level}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{level.label}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List style={{ width: '100%' }}>
                  {users.filter(user => user.accessLevel === level.level).map(user => (
                    <ListItem key={user._id} component={Paper}>
                      <ListItemAvatar>
                        <Avatar
                          src='/'
                          alt={`avatar-${level.icon}`}
                          className={classes[level.level]}
                        >
                          {level.icon}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText>
                        <Typography variant="body1">{user.email}</Typography>
                      </ListItemText>
                      <ListItemSecondaryAction>
                        <Tooltip title="Изменить уровень доступа">
                          <span>
                            <Button
                              onClick={() => openEditDialogHandler(user)}
                              color="primary"
                              disabled={user.accessLevel === 100 || user._id === oneUserLoading}
                              startIcon={
                                <Icon>enhanced_encryption</Icon>
                              }
                            >
                              Предоставить доступ
                            </Button>
                          </span>
                        </Tooltip>
                        {accessLevel > 10 &&
                          <Tooltip title="Удалить">
                            <span>
                              <IconButton
                                onClick={() => openDeleteDialogHandler(user)}
                                color="secondary"
                                disabled={user.accessLevel === 100 || user._id === oneUserLoading}
                              >
                                <Icon>delete_outline</Icon>
                              </IconButton>
                            </span>
                          </Tooltip>
                        }
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </Grid>
      </Grid>
      <Dialog
        open={openEditDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeEditDialogHandler}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Выберите уровень доступа</DialogTitle>
        <DialogContent>
          <DialogContentText>Укажите новый урвень доступа пользователя&nbsp;
            <Typography component="span" display="inline" color="secondary">{checkedUser.email}</Typography>
          </DialogContentText>
          <Select
            fullWidth
            value={selectValue}
            onChange={(event) => setSelectValue(event.target.value)}
          >
            {levels.map(item => (
              <MenuItem
                key={item.label}
                disabled={item.level === 100}
                value={item.level}
                selected={item.level === checkedUser.accessLevel}
              >
                <Typography>{item.level}&nbsp;</Typography>
                <Typography variant="caption">{item.label}</Typography>
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={changeLevelHandler} disabled={checkedUser.accessLevel === selectValue} color="primary">Подтвердить</Button>
          <Button onClick={closeEditDialogHandler}>Отменить</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeleteDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeDeleteDialogHandler}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Удалить пользователя?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {"Для подтвержения удаления пользователя "}
            <Typography component="span" display="inline" color="secondary">{deleteUser.email}</Typography>
            {" повторите его email"}
          </DialogContentText>
          <TextField
            error={inputValue !== deleteUser.email}
            fullWidth
            value={inputValue}
            onChange={changeInputHandler}
            placeholder="Введите email"
          />
          <DialogActions>
            <Button onClick={deleteUserHandler} disabled={deleteUser.email !== inputValue} color="primary">Подтвердить</Button>
            <Button onClick={closeDeleteDialogHandler}>Отменить</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.accessState.users,
    loading: state.accessState.loading,
    message: state.accessState.message,
    oneUserLoading: state.accessState.oneUserLoading,
    accessLevel: state.authState.token.accessLevel
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUsersForAdminReques: bindActionCreators(getUsersForAdminRequesAction, dispatch),
    clearMessage: bindActionCreators(clearMessageAction, dispatch),
    changeLevelRequest: bindActionCreators(changeLevelRequestAction, dispatch),
    deleteUserRequest: bindActionCreators(deleteUserRequestAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccessChangePanel)