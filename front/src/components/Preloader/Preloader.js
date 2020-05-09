import React from 'react'
import { CircularProgress, Paper } from '@material-ui/core'


import './Preloader.scss'

const Preloader = () => {
  return (
    <div className="preloader-wrapper">
      <CircularProgress />
    </div>
  )
}

export default Preloader