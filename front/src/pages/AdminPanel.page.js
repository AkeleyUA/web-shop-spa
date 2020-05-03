import React, { useContext } from 'react'
import { AdminSettingsList } from '../components/AdminSettingsList/AdminSettingsList'
import { Button } from 'react-materialize'
import { logoutAction } from '../components/AuthForm/action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


const AdminPanelPage = ({logout}) => {
  return (
    <div className="admin-panel">
      <AdminSettingsList />
      <Button onClick={logout}>Выйти</Button>
    </div>
  )
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    logout: bindActionCreators(logoutAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanelPage)