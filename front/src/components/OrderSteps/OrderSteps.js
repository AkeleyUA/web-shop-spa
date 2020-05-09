import React from 'react'
import { Stepper, Step, StepLabel, Typography, Icon, Button } from '@material-ui/core'

import './OrderSteps.scss'
import OrderContactInfo from '../OrderContactInfo/OrderContactInfo'
import OrderPayWay from '../OrderPayWay/OrderPayWay'
import OrderConfirmation from '../OrderConfirmation/OrderConfirmation'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { setStepAction } from './action'
import { bindActionCreators } from 'redux'

const steps = [
  {
    component: 'contact-info',
    label: 'Контактные данные'
  },
  {
    component: 'pay-way',
    label: 'Выбор способа оплаты'
  },
  {
    component: 'confirmation',
    label: 'Подтвержение платежа'
  }
]

const OrderSteps = ({ step, setStep }) => {

  const switchRender = () => {
    switch (step) {
      case 1: {
        return <OrderPayWay />
      }
      case 2: {
        return <OrderConfirmation />
      }
      case 3: {
        return (
          <div className='result-wrapper'>
            <Icon fontSize="large" className="success-icon">check</Icon>
            <Typography variant="subtitle2">Заказ отправлен в обработку.</Typography>
            <Typography variant="body2">Ожидайте звонка, для подтверждения заказа</Typography>
            <Button
              variant="contained"
              color="primary"
              component={NavLink}
              onClick={() => {setStep(0)}}
              to='/'
            >
              На главную
            </Button>
          </div>
        )
      }
      case 4: {
        return (
          <div className='result-wrapper'>
            <Icon fontSize="large" className="falure-icon">close</Icon>
            <Typography variant="subtitle2">Произошла ошибка, попробуйте снова.</Typography>
            <Typography variant="body2">Описание ошибки</Typography>
            <Button
              variant="contained"
              color="primary"
              component={NavLink}
              onClick={() => {setStep(0)}}
              to='/'
            >
              На главную
            </Button>
          </div>
        )
      }
      default: {
        return <OrderContactInfo />
      }
    }
  }

  return (
    <main className="order-steps">
      {switchRender()}
      <Stepper activeStep={step}>
        {steps.map((item, index) => {
          const stepProps = {}
          const labelProps = {}
          return (
            <Step key={item.component} {...stepProps}>
              <StepLabel {...labelProps}>{item.label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
    </main>
  )
}

const mapStateToProps = state => {
  return {
    step: state.stepsState.step
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setStep: bindActionCreators(setStepAction, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderSteps)