import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import ProductCreator from '../ProductCreator/ProductCreator'
import CategoryCreator from '../CategoryCreator/CategoryCreator'


const AdminDashboard = () => {
  return (
    <Grid container className="admin-dashboard">
      <Grid item lg={12}>
        <CategoryCreator />
      </Grid>
      <Grid item lg={12}>
        <ProductCreator />
      </Grid>
    </Grid>
  )
}

const mapStateToProps = state => {
  return {
  }
}
export default connect(mapStateToProps, null)(AdminDashboard)