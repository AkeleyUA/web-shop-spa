import React from 'react'
import { TextField, Button, Typography } from '@material-ui/core'

import './OrderPayWay.scss'
import { setStepAction } from '../OrderSteps/action'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const OrderPayWay = ({ setStep }) => {
  return (
    <form className="pay-way-form">
      <TextField id="card-num" required label="Номер карты" variant="outlined"></TextField>
      <TextField id="card-num" required label="Имя держателя" variant="outlined"></TextField>
      <div className="short-inputs">
        <TextField id="card-num" required label="Срок действия" variant="outlined"></TextField>
        <TextField id="card-num" required label="CVV" variant="outlined"></TextField>
      </div>
      <Typography variant="caption">* обязательное поле</Typography>
      <div className="order-button-group">
        <Button variant="outlined" color="primary" onClick={() => setStep(0)}>Назад</Button>
        <Button variant="contained" color="primary" onClick={() => setStep(2)}>Продолжить</Button>
      </div>
    </form>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    setStep: bindActionCreators(setStepAction, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(OrderPayWay)