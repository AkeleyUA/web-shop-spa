import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AdminSettingsList } from "../components/AdminSettingsList/AdminSettingsList";
import { logoutAction } from "../components/AuthForm/action";
import {
  Button,
} from "@material-ui/core";

const AdminPanelPage = ({ logout }) => {
  return (
    <div className="admin-panel">
      <AdminSettingsList />
      <Button onClick={logout}>Выйти</Button>
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    logout: bindActionCreators(logoutAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanelPage);
