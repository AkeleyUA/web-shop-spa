import React, { useEffect, useState } from 'react'
import { Fab, Icon, Zoom } from '@material-ui/core'
import './ToUpButton.scss'


export const ToUpButton = ({ show, containerRef }) => {

  const handleScrollToTop = () => {
    containerRef.current.scroll({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="to-up-button">
      <Zoom
        timeout={350}
        in={show}
        unmountOnExit
      >
        <Fab
          color="primary"
          aria-label="up"
          onClick={handleScrollToTop}
        >
          <Icon>expand_less</Icon>
        </Fab>
      </Zoom>
    </div>
  )
}