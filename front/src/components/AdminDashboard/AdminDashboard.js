import React from 'react'
import { Grid, Typography } from '@material-ui/core'


const AdminDashboard = () => {
  return (
    <Grid container className="admin-dashboard">
      <Grid item lg={12}>
        <Typography variant="subtitle1">Пользователей на сайте</Typography>
      </Grid>
      <Grid item lg={4} style={{ border: '1px solid #000' }}>
        Модераторы(4)
      </Grid>
      <Grid item lg={4} style={{ border: '1px solid #000' }}>
        Контент-менеджеры(2)
      </Grid>
      <Grid item lg={4} style={{ border: '1px solid #000' }}>

      </Grid>
    </Grid>
  )
}

export default AdminDashboard