import React from 'react'
import UserInfo from '../UserInfo/UserInfo';
import { Typography, AppBar, Toolbar } from '@material-ui/core'
import { settingsList } from '../AdminSettingsList/AdminSettingsList'
import { connect } from 'react-redux';
import { matchPath, useLocation } from 'react-router-dom';

import './AdminPanelHeader.scss'


const AdminPanelHeader = ({ email }) => {
  const location = useLocation()
  const findName = settingsList.find(item => matchPath(location.pathname, item.path))

  return (
    <AppBar
      position="sticky"
      color="inherit"
    >
      <Toolbar
        className="admin-panel-header"
      >
        <div className="typography-wrapper">
          <Typography variant="body1">
            {findName !== undefined ? findName.name : ''}
          </Typography>
          <Typography variant="body1">{email}</Typography>
        </div>
        <UserInfo />
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = state => {
  return {
    email: state.authState.token.userEmail
  }
}
export default connect(mapStateToProps, null)(AdminPanelHeader)