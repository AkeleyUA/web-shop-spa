import React, { useState, useCallback, useEffect } from 'react'


import './CategoryCreator.scss'
import { TextField, Paper, Button, FormControl, FormHelperText, Modal } from '@material-ui/core'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addCategoryRequestAction } from './action'

const CategoryCreator = ({
  categories,
  addCategoryRequest,
  loading,
  success,
}) => {
  const [category, setCategory] = useState({ name: '' })
  const [isOpen, setIsOpen] = useState(false)

  const changeInputHandler = event => {
    setCategory({ name: event.target.value })
  }
  const modalOpenHandler = () => {
    setIsOpen(true)
  }
  const modalCloseWrapper = (event) => {
    if(event.currentTarget === event.target) {
      setIsOpen(false)
    }
  }
  const modalCloseHendler = () => {
    setIsOpen(false)
  }

  const addCatogory = useCallback(() => {
    addCategoryRequest(category.name)
  }, [category.name])

  useEffect(() => {
    if (success) {
      return setCategory({name: ''})
    }
  }, [success])

  return (
    <Paper className="category-creator">
      <Button variant="outlined" onClick={modalOpenHandler}>Добавить</Button>
      <Modal
        open={isOpen}
        onClose={modalCloseHendler}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="category-creator-body" onClick={modalCloseWrapper}>
          <FormControl
            className="add-category-form"
            margin="dense"
            required
            size="small"
          >
            <FormHelperText>Добавление категории</FormHelperText>
            <TextField
              id="name"
              label="Название"
              variant="outlined"
              name="name"
              size="small"
              onChange={changeInputHandler}
              value={category.name}
              autoComplete="off"
            />
            <Button variant="outlined" color="primary" disabled={loading} onClick={addCatogory}>Добавить</Button>
            <Button variant="outlined" color="secondary" onClick={modalCloseHendler}>Закрыть</Button>
          </FormControl>
        </div>
      </Modal>
    </Paper>
  )
}

const mapStateToProps = state => {
  return {
    categories: state.categoriesState.categories,
    loading: state.categoryCreatorState.loading,
    success: state.categoryCreatorState.success,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCategoryRequest: bindActionCreators(addCategoryRequestAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryCreator)