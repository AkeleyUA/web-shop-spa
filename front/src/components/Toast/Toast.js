import React, { useEffect } from 'react'
import { Alert } from '@material-ui/lab'

import './Toast.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { closeToastAction } from './action'

const Toast = ({ message, category, isShow, closeToast}) => {

  useEffect(() => {
    if(isShow) {
      const timer = setTimeout(() => {
        closeToast()
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [isShow])

  if (isShow) {
    return (
      <Alert className="toast" severity={category}>
        {message}
      </Alert>
    )
  } else {
    return null
  }
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