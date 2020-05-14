import React, { useState } from 'react'
import { TextField, Typography, Button, Icon, InputAdornment, Popover } from '@material-ui/core'

import { bindActionCreators } from 'redux'
import { setStepAction } from '../OrderSteps/action'
import { connect } from 'react-redux'

import './OrderConfirmation.scss'

const OrderConfirmation = ({ setStep }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [value, setValue] = useState('')

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null);
  }

  const changeHandler = event => {
    setValue(event.target.value)
  }

  const lastStepHandler = () => {
    if (value === '1234') {
      setStep(3)
    } else {
      setStep(4)
    }
  }

  const open = Boolean(anchorEl)
  return (
    <form className="order-confirm">
      <Popover
        id="key-over-popover"
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography variant="body2">Код: 1234</Typography>
      </Popover>
      <TextField
        fullWidth
        id="key"
        type="password"
        label="Введите код подтверждения"
        variant="outlined"
        color="primary"
        onChange={changeHandler}
        required
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
            >
              <Icon
                style={{ zIndex: 1400 }}
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                color="primary"
              >
                help
                </Icon>
            </InputAdornment>
          ),
        }}
      />
      <Typography variant="caption" >* обязательно поле</Typography>
      <div className="order-button-group">
        <Button variant="outlined" color="primary" onClick={() => setStep(1)}>Назад</Button>
        <Button variant="contained" color="primary" onClick={lastStepHandler}>Подтвердить</Button>
      </div>
    </form>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    setStep: bindActionCreators(setStepAction, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(OrderConfirmation)