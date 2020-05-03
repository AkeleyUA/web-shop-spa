import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { CircularProgress, TextField } from '@material-ui/core'

import './ProductCreator.scss'

const ProductCreator = () => {
  const [form, setForm] = useState(
    {
      name: '',
      category: '',
      model: '',
      amount: '',
      img: '',
      description: '',
      price: '',
    }
  )

  const changeInputHandler = event => {
    console.log(event.target.name, event.target.value)
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const addProductHandler = async () => {
    setForm(
      {
        name: '',
        category: '',
        model: '',
        amount: '',
        img: '',
        description: '',
        price: '',
      }
    )
  }

  if (loading) {
    return (
      <div className="preloader-center">
        <CircularProgress />
      </div>
    )
  } else {
    return (
      <div className="product-creator">
        <div className="form">
          <TextField
            id="name"
            label="name"
            variant="outlined"
            name="name"
            />
          <Select
            id="category"
            name="category"
            multiple={false}
            onChange={changeInputHandler}
            options={{
              classes: '',
              dropdownOptions: {
                alignment: 'left',
                autoTrigger: true,
                closeOnClick: true,
                constrainWidth: true,
                coverTrigger: true,
                hover: false,
                inDuration: 150,
                outDuration: 250
              }
            }}
            value=""
          >
            <option
              disabled
              value=""
            >
              Выберите категорию
            </option>
            {categories.map(item => {
              return (
                <option
                  key={item._id}
                  value={item.name}
                >{item.name}</option>
              )
            })}

          </Select>
          <TextInput
            id="model"
            label="model"
            name="model"
            onChange={changeInputHandler}
          />
          <TextInput
            id="amount"
            label="amount"
            name="amount"
            onChange={changeInputHandler}
          />
          <TextInput
            id="img"
            label="img"
            name="img"
            onChange={changeInputHandler}
          />
          <TextInput
            id="description"
            label="description"
            name="description"
            onChange={changeInputHandler}
          />
          <TextInput
            label="price"
            name="price"
            id="price"
            onChange={changeInputHandler}
          />
          <Button type="submit" onClick={addProductHandler} >Добавить</Button>
          <NavLink className="btn" to="/admin/products">Список продуктов</NavLink>
        </div>
      </div>
    )
  }
}

export default connect()(ProductCreator)