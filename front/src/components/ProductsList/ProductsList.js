import React, { useEffect, useState, useCallback } from 'react'
import { useHttp } from '../../Hooks/http.hook'
import { useMessage } from '../../Hooks/message.hook'
import { NavLink } from 'react-router-dom'
import { Preloader, Table, Button, Checkbox } from 'react-materialize'

export const ProductsList = () => {
  const message = useMessage()
  const { loading, err, request, clearErr } = useHttp()
  const [products, setProducts] = useState([])

  const getProducts = useCallback(async () => {
    try {
      const data = await request('/api/products/get-products')
      setProducts(data)
    } catch (e) {}
  }, [request])

  const delProduct = useCallback(async (event) => {
    const id = event.target.name
    try {
      const data = await request('/api/products/del-products', 'POST', {id})
      if(data.status) {
        getProducts()
      }
    } catch (e) {}
  }, [])

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    message(err)
    clearErr()
  }, [err, message, clearErr])

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
              <th data-field="name">Имя</th>
              <th data-field="amount">Количество</th>
              <th data-field="price">Цена</th>
              <th data-field="description">Описание</th>
              <th data-field="delete">Удалить</th>
              <th data-field="show">Отображать</th>
            </tr>
          </thead>
          <tbody>
            {products.map(item => {
              return (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.amount}</td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td><Button name={item._id} onClick={delProduct}>-</Button></td>
                  <td>
                    <Checkbox
                      id={`${item._id}`}
                      label=''
                      value=''
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        <NavLink to="/admin/products/add">Добавить</NavLink>
      </div>
    )
  }
}