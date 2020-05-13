import React, { useState, useCallback, useEffect } from 'react'


import './CategoryCreator.scss'
import { TextField, Paper, Button, FormControl, FormHelperText, Modal } from '@material-ui/core'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addCategoryRequestAction } from './action'
import { useSnackbar } from 'notistack'
import { clearMessageAction } from '../../pages/Home.page/action'

const CategoryCreator = ({
  message,
  addCategoryRequest,
  loading,
  success,
  clearMessage
}) => {
  const [category, setCategory] = useState({ name: '' })
  const { enqueueSnackbar } = useSnackbar()

  const changeInputHandler = event => {
    setCategory({ name: event.target.value })
  }

  const addCatogory = useCallback(() => {
    addCategoryRequest(category.name)
  }, [category.name, addCategoryRequest])

  useEffect(() => {
    if (success) {
      setCategory({ name: '' })
    }
  }, [success])

  useEffect(() => {
    if (message) {
      enqueueSnackbar(message)
      clearMessage()
    }
  }, [message, enqueueSnackbar])

  return (
    <div className="category-creator-wrapper">
      <Paper className="category-creator-form">
        <FormHelperText>Добавление категории</FormHelperText>
        <TextField
          fullWidth
          id="categgory-name"
          label="Название"
          variant="outlined"
          name="name"
          size="small"
          onChange={changeInputHandler}
          value={category.name}
          autoComplete="off"
        />
        <Button className="add-category-btn" variant="contained" color="primary" disabled={loading} onClick={addCatogory}>Добавить</Button>
      </Paper>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    message: state.categoryCreatorState.message,
    loading: state.categoryCreatorState.loading,
    success: state.categoryCreatorState.success,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCategoryRequest: bindActionCreators(addCategoryRequestAction, dispatch),
    clearMessage: bindActionCreators(clearMessageAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryCreator)