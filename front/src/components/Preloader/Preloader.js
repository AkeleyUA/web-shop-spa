import React from 'react'
import { CircularProgress, Paper } from '@material-ui/core'


import './Preloader.scss'

const Preloader = () => {
  return (
    <Paper className="preloader-wrapper">
      <CircularProgress />
    </Paper>
  )
}

export default Preloader