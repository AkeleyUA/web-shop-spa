import React, { useState, useEffect, useCallback } from 'react'
import { TextInput, Button, Preloader, Select } from 'react-materialize'
import { useHttp } from '../../Hooks/http.hook'
import { useMessage } from '../../Hooks/message.hook'
import './ProductCreator.scss'
import { NavLink } from 'react-router-dom'

export const ProductCreator = () => {
  const { loading, err, request, clearErr } = useHttp()
  const message = useMessage()
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState(
    {
      name:'',
      category: '',
      model:'',
      amount: '',
      img: '',
      description: '',
      price: '',
    }
  )

  const getCategories = useCallback(async () => {
    try {
      const data = await request('/api/categories/get')
      setCategories(data)
    } catch (e) {}
  }, [request])

  useEffect(() => {
    getCategories()
    message(err)
    clearErr()
  }, [err, message, clearErr])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeInputHandler = event => {
    console.log(event.target.name, event.target.value)
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const addProductHandler = async () => {
    try {
      const data = await request('/api/products/add', 'POST', {...form})
      message(data.message)
      setForm(
        {
          name:'',
          category: '',
          model:'',
          amount: '',
          img: '',
          description: '',
          price: '',
        }
      )
    } catch (e) {}
  }

  if (loading) {
    return (
      <div className="preloader-center">
        <Preloader />
      </div>
    )
  } else {
    return (
      <div className="product-creator">
        <div className="form">
          <TextInput
            id="name"
            label="name"
            name="name"
            onChange={changeInputHandler}
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