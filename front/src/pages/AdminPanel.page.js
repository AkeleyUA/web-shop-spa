import React from "react";
import { connect } from "react-redux";
import { AdminSettingsList } from "../components/AdminSettingsList/AdminSettingsList"
import { AdminRoutes } from '../routes/routes'
import {
  Grid,
  Box
} from "@material-ui/core";
import AdminPanelHeader from "../components/AdminPanelHeader/AdminPanelHeader";

const AdminPanelPage = () => {
  return (
    <Grid
      container
      className="admin-panel"
    >
      <Grid item lg={2} />
      <Grid item lg={10}>
        <AdminPanelHeader/>
      </Grid>
      <Grid item lg={2} className="admin-drawer">
        <AdminSettingsList/>
      </Grid>
      <Grid item lg={10}>
        <Box style={{ margin: 20, padding: 20 }} >
          <AdminRoutes />
        </Box>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = state => {
  return {
    userId: state.authState.token.userId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanelPage)
