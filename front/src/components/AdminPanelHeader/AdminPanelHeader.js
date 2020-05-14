import React from 'react'
import UserInfo from '../UserInfo/UserInfo';
import { Typography, AppBar, Toolbar } from '@material-ui/core'
import { settingsList } from '../AdminSettingsList/AdminSettingsList'
import { connect } from 'react-redux';
import { matchPath, useLocation } from 'react-router-dom';

import './AdminPanelHeader.scss'


const AdminPanelHeader = () => {
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
        <Typography variant="body1">
          {findName !== undefined ? findName.name : ''}
        </Typography>
        <UserInfo />
      </Toolbar>
    </AppBar>
  )
}

export default connect()(AdminPanelHeader)