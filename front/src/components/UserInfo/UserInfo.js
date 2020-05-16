import React, { useState } from 'react'
import {
  Typography,
  Menu,
  Avatar,
  MenuItem,
  Dialog,
  Button,
  DialogActions,
  DialogTitle,
  DialogContent
} from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { logoutAction } from '../AuthForm/action'
import { connect } from 'react-redux'
import { levels } from '../AccessChangePanel/AccessChangePanel'

import './UserInfo.scss'


const classes = {
  1: 'avatar-blue',
  2: 'avatar-green',
  3: 'avatar-red',
  10: 'avatar-orange',
  100: 'avatar-orange',
}

const UserInfo = ({ logout, accessLevel }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [dialog, setDialog] = useState(false)

  const findLevel = levels.find(item => item.level === accessLevel) || 0

  const handleOpenMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleOpenDialog = () => {
    setDialog(true)
  }

  const handleCloseDialog = () => {
    setDialog(false)
  }

  const logoutHandler = () => {
    logout()
  }

  return (
    <div className="user-info">
      <Avatar
        alt="user"
        onClick={handleOpenMenu}
        className={`avatar-info ${classes[accessLevel]}`}
      >
        {findLevel.icon}
      </Avatar>
      <Menu
        variant="menu"
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        elevation={1}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem disabled className="level-info-item">
          <Typography variant="caption" color="primary">
            Уровень: {findLevel.label}
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleOpenDialog}>Инфо</MenuItem>
        <MenuItem to='/admin' onClick={logoutHandler} component={NavLink}>Выйти</MenuItem>
      </Menu>
      <Dialog
        open={dialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Уровни доступа</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2">
            <Typography variant="body2" color="primary">
              Контент-менеджер &nbsp;
              </Typography>
              - предлагает измeнения/добавления товара или категории.
            </Typography>
          <Typography variant="subtitle2">
            <Typography variant="body2" color="primary">
              Модератор &nbsp;
              </Typography>
              - подтверждает измeнения/добавленя товара, категории, отзыва на сайте.
            </Typography>
          <Typography variant="subtitle2">
            <Typography variant="body2" color="primary">
              Супервизор &nbsp;
              </Typography>
              - доступ к статистике пользователей админ панели, статистика продажи товаров.
            </Typography>
          <Typography variant="subtitle2">
            <Typography variant="body2" color="primary">
              Администратор &nbsp;
              </Typography>
              - всё выше перечисленное, подтверждает создание нового пользователя, предоставление/измeнения прав доступа.
            </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            Понятно
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    accessLevel: state.authState.token.accessLevel,
    userId: state.authState.token.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: bindActionCreators(logoutAction, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)