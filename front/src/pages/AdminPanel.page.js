import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AdminSettingsList } from "../components/AdminSettingsList/AdminSettingsList"
import { logoutAction } from "../components/AuthForm/action"
import { AdminRoutes } from '../routes/routes'
import { Link } from 'react-router-dom'
import {
  Button,
  Grid,
  Typography,
  Box,
  Paper
} from "@material-ui/core";

import { settingsList } from '../components/AdminSettingsList/AdminSettingsList'

const CustomLink = ({to, onClick}) => {
  return (
    <Link to={to} onClick={onClick} style={{textDecoration:'none'}}>
      <Button>Выйти</Button>
    </Link>
  )
}

const AdminPanelPage = ({ logout, location }) => {
  console.log(location)
  const pathList = settingsList.map(item => ({ path: item.path, name: item.name }))
  const findName = pathList.find(item => item.path === location.pathname)

  return (
    <Grid container className="admin-panel">
      <Grid item lg={2} />
      <Grid item lg={10}>
        <Box style={{ margin: 20, display: 'flex', justifyContent: 'space-between' }} component={Paper}>
          <Typography variant="body1">
            {findName !== undefined ? findName.name : ''}
          </Typography>
          <CustomLink to='/admin' onClick={logout}/>
        </Box>
      </Grid>
      <Grid item xs={2} className="admin-drawer">
        <AdminSettingsList />
      </Grid>
      <Grid item lg={10}>
        <Box style={{ margin: 20, padding: 20}} component={Paper}>
          <AdminRoutes />
        </Box>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    logout: bindActionCreators(logoutAction, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanelPage)
