import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import ProductCreator from '../ProductCreator/ProductCreator'
import CategoryCreator from '../CategoryCreator/CategoryCreator'
import { socket } from '../../App'
import OnlineUserPanel from '../OnlineUserPanel/OnlineUserPanel'
import RegistrationRequestPanel from '../RegistrationRequestPanel/RegistrationRequestPanel'

const AdminDashboard = ({ accessLevel }) => {
  const [data, setData] = useState({})

  const dataUpdateHandler = (res) => {
    setData(res.data)
  }

  useEffect(() => {
    socket.on('stats', dataUpdateHandler)
    return () => {
      socket.off('stats')
    }
  }, [])

  socket.emit('get stats')

  return (
    <Grid container className="admin-dashboard">
      {(accessLevel === 3 || accessLevel === 2 || accessLevel >= 10)
        && <>
          <Grid item lg={12}>
            <Typography variant="caption">Пользователей на сайте</Typography>
          </Grid>
          <Grid item lg={12}>
            <OnlineUserPanel data={data} accessLevel={accessLevel} />
          </Grid>
        </>
      }
      {accessLevel === 1
        && <Grid
          item
          lg={12}>
          <ProductCreator />
        </Grid>
      }
      {accessLevel >= 10
        && <>
          <Grid item lg={12}>
            <Typography variant="caption">Непотдверждённые пользователи</Typography>
          </Grid>
          <RegistrationRequestPanel onDashboard={true} />
        </>
      }
    </Grid>
  )
}

const mapStateToProps = state => {
  return {
    accessLevel: state.authState.token.accessLevel
  }
}
export default connect(mapStateToProps, null)(AdminDashboard)