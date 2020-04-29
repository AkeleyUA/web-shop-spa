import React, { useState, useEffect, useCallback } from 'react'
import { Table, TextInput, Button, Preloader, Checkbox } from 'react-materialize'
import { useHttp } from '../../Hooks/http.hook'
import { useMessage } from '../../Hooks/message.hook'
import './Categories.scss'

export const Categories = () => {
  const { loading, err, request, clearErr } = useHttp()
  const message = useMessage()
  const [category, setCategory] = useState({ name:'' })
  const [categories, setCategories] = useState([])

  const getCategories = useCallback(async () => {
    try {
      const data = await request('/api/categories/get')
      setCategories(data)
    } catch (e) {}
  }, [request])

  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    message(err)
    clearErr()
  }, [err, message, clearErr])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const addCategoriesHendler = (event) => {
    setCategory({...category, [event.target.name]: event.target.value})
  }

  const addCategory = async () => {
    try {
      const data = await request('/api/categories/add', 'POST', {...category})
      message(data.message)
      if (data.status) {
        getCategories()
      }
      setCategory({name: ''})
    } catch (e) {}
  }

  const delCategory = async (event) => {
    const id = event.target.name
    try {
      const data = await request('/api/categories/del', 'POST', {id})
      if(data.status) {
        getCategories()
      }
    } catch (e) {}
  }

  const showOnWebSite = async (event) => {
    const id = event.target.id
    const checked = event.target.checked
    try {
      const data = await request('/api/categories/show', 'POST', {id, checked})
      if(data.status) {
        getCategories()
      }
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
      <div className="categories">
        <Table>
          <thead>
            <tr>
              <th data-field="id">Id</th>
              <th data-field="name">Имя категории</th>
              <th data-field="delete">Удалить</th>
              <th data-field="show">Отображать</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(item => {
              return (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td><Button name={item._id} onClick={delCategory}>-</Button></td>
                  <td>
                    <Checkbox
                      id={`${item._id}`}
                      label=''
                      value=''
                      onChange={showOnWebSite}
                      checked={item.show}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        <TextInput name="name" onChange={addCategoriesHendler}/>
        <Button onClick={addCategory}>Добавить</Button>
      </div>
    )
  }
}