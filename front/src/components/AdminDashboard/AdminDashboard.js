import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { connect } from 'react-redux'
import ProductCreator from '../ProductCreator/ProductCreator'
import CategoryCreator from '../CategoryCreator/CategoryCreator'
import { socket } from '../../App'
import OnlineUserPanel from '../OnlineUserPanel/OnlineUserPanel'

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

  return <OnlineUserPanel data={data} accessLevel={accessLevel}/>
  // return (
  //   <Grid container className="admin-dashboard">
  //     <Grid item lg={12}>
  //       <CategoryCreator />
  //     </Grid>
  //     <Grid item lg={12}>
  //       <ProductCreator />
  //     </Grid>
  //   </Grid>
  // )
}

const mapStateToProps = state => {
  return {
    accessLevel: state.authState.token.accessLevel
  }
}
export default connect(mapStateToProps, null)(AdminDashboard)