import React from 'react'
import { Paper, Grid, Typography } from '@material-ui/core'

import './OnlineUserPanel.scss'

const config = [
  {
    label: 'Покупателей: ',
    key: 'anonymous',
    lvl: 1
  },
  {
    label: 'Контент-менеджеров: ',
    key: 'contentManager',
    lvl: 2
  },
  {
    label: 'Модераторов: ',
    key: 'moderator',
    lvl: 3
  },
  {
    label: 'Администраторов: ',
    key: 'admin',
    lvl: 10
  }
]

const OnlineUserPanel = ({ data, accessLevel }) => {
  return (
    <Grid container component={Paper} className="online-users-panel">
      {config
        .filter(item => item.lvl <= accessLevel)
        .map(item => (
          <Grid key={item.label} item lg={3}>
            <Paper className="online-group-card">
              <Typography
                align="center"
                variant="body1"
              >
                {item.label}
              </Typography>
              <Typography
                align="center"
                variant="h6"
                color="primary"
              >
                {data[item.key] ? data[item.key].length : 0}
              </Typography>
            </Paper>
          </Grid>
        ))}
    </Grid>
  )
}

export default OnlineUserPanel