import React from 'react'
import { Paper, Box, Grid, Typography } from '@material-ui/core'

const OnlineUserPanel = ({ data, accessLevel }) => {
  return (
    <Grid container spacing={4} justify="space-around" component={Paper}>
      <Grid item lg={12}><Typography variant="caption">Пользователей на сайте</Typography></Grid>
      <Grid item>
        <Typography variant="body1">Покупателей:&nbsp;</Typography>
        <Typography align="center" variant="h6" color="primary">{data.anonymous ? data.anonymous.length : 0}</Typography>
      </Grid>
      <Grid item >
        <Typography variant="body1">Контент-менеджеров:&nbsp;</Typography>
        <Typography align="center" variant="h6" color="primary">{data.contentManager ? data.contentManager.length : 0}</Typography>
      </Grid>
      <Grid item >
        <Typography variant="body1">Модераторов:&nbsp;</Typography>
        <Typography align="center" variant="h6" color="primary">{data.moderator ? data.moderator.length : 0}</Typography>
      </Grid>
      {accessLevel > 10
        ? <>
          <Grid item >
            <Typography variant="body1">Супервизоров:&nbsp;</Typography>
            <Typography align="center" variant="h6" color="primary">{data.supervisor ? data.supervisor.length : 0}</Typography>
          </Grid>
          <Grid item >
            <Typography variant="body1">Администраторов:&nbsp;</Typography>
            <Typography align="center" variant="h6" color="primary">{data.admin ? data.admin.length : 0}</Typography>
          </Grid>
        </>
        : null
      }
    </Grid>
  )
}

export default OnlineUserPanel