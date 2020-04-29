import React, { useContext } from 'react'
import { AdminSettingsList } from '../components/AdminSettingsList/AdminSettingsList'
import { Button } from 'react-materialize'
import { AuthContext } from '../context/AuthContext'


export const AdminPanelPage = () => {
  const auth = useContext(AuthContext)
  return (
    <div className="admin-panel">
      <AdminSettingsList />
      <Button onClick={auth.logout}>Выйти</Button>
    </div>
  )
}