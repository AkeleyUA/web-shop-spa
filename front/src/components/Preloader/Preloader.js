import React from 'react'
import { CircularProgress, Paper } from '@material-ui/core'


import './Preloader.scss'

const Preloader = ({ className }) => {
  return (
    <div className={className ? `preloader-wrapper ${className}` : "preloader-wrapper" }>
      <CircularProgress />
    </div>
  )
}

export default Preloader