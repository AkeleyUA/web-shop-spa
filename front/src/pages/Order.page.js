import React from 'react'
import { Container, Paper } from '@material-ui/core'
import OrderHeader from '../components/OrderHeader/OrederHeader'
import OrderSteps from '../components/OrderSteps/OrderSteps'

const OrderPage = () => {
  return (
    <Container maxWidth="sm" component={Paper}>
      <OrderHeader />
      <OrderSteps />
    </Container>
  )
}

export default OrderPage