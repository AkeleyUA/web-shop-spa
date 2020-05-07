import React, { useEffect, useState } from 'react'
import { Fab, Icon, Zoom } from '@material-ui/core'
import './ToUpButton.scss'


export const ToUpButton = () => {
  const [show, setShow] = useState(false)

  const scrollHandler = () => {
    document.documentElement.scrollTop > 400
      ? setShow(true)
      : setShow(false)
  }
  const scrollToTopHandler = () => {
    window.scroll({top: 0, behavior: 'smooth'})
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [])

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
          onClick={scrollToTopHandler}
        >
          <Icon>expand_less</Icon>
        </Fab>
      </Zoom>
    </div>
  )
}