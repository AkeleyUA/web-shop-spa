import React, { useState } from 'react'
import { Typography, Icon, Popover, Button } from '@material-ui/core'

import './OrderHeader.scss'

const OrderHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl)
  return (
    <header className="oreder-header">
      <Popover
        id="help-over-popover"
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography variant="caption">График работы</Typography>
        <Typography variant="h5">ПН - ПТ: 09:00 - 18:00</Typography>
        <Typography variant="body1">Суббота: 09:00 - 15:00</Typography>
        <Typography variant="body1">Воскресенье: 09:00 - 14:00</Typography>
        <Typography variant="body2" color="secondary">Внимание! Важная информация</Typography>
      </Popover>
      <Typography variant="h3">LOGOtip</Typography>
      <Button
        variant="outlined"
        color="primary"
        aria-owns={open ? 'help-over-popover' : undefined}
        aria-haspopup="true"
        style={{zIndex:1400}}
        onMouseEnter={handlePopoverOpen}
        onClick={handlePopoverClose}
        onMouseLeave={handlePopoverClose}
        endIcon={<Icon>help</Icon>}
      >
        +380 73 069 XX XX
      </Button>
    </header>
  )
}

export default OrderHeader