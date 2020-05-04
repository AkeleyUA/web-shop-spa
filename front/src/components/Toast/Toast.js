import React, { useEffect } from 'react'
import { Alert } from '@material-ui/lab'
import { Snackbar, Slide } from '@material-ui/core'

import './Toast.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { closeToastAction } from './action'


const Toast = ({ message, category, isShow, closeToast }) => {

  const TransitionDown = (props) => {
    return <Slide {...props} direction="down" />;
  }

  return (
    <Snackbar
      open={isShow}
      autoHideDuration={5000}
      onClose={closeToast}
      anchorOrigin={{ vertical:'top', horizontal:'right' }}
      TransitionComponent={TransitionDown}
    >
      <Alert onClose={closeToast} severity={category}>
        {message}
      </Alert>
    </Snackbar>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    closeToast: bindActionCreators(closeToastAction, dispatch)
  }
}

const mapStateToProps = state => {
  return {
    isShow: state.toastState.isShow,
    message: state.toastState.message,
    category: state.toastState.category
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toast)