import React from 'react'
import UserInfo from '../UserInfo/UserInfo';
import { Typography, Paper, Box, AppBar, Toolbar, Icon } from '@material-ui/core'
import { settingsList } from '../AdminSettingsList/AdminSettingsList'
import { connect } from 'react-redux';

import './AdminPanelHeader.scss'

const AdminPanelHeader = ({ location }) => {
  const pathList = settingsList.map(item => ({ path: item.path, name: item.name }))
  const findName = pathList.find(item => item.path === location.pathname)
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