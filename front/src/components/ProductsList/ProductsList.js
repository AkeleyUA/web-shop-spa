import React, { useEffect, useState, useCallback } from 'react'
import { useHttp } from '../../Hooks/http.hook'
import { useMessage } from '../../Hooks/message.hook'
import { NavLink } from 'react-router-dom'
import { Preloader, Table, Button, Checkbox, TextInput } from 'react-materialize'

export const ProductsList = () => {
  const message = useMessage()
  const { loading, err, request, clearErr } = useHttp()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  const getProducts = useCallback(async () => {
    try {
      const data = await request('/api/products/get-products')
      setProducts(data)
      setFilteredProducts(data)
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
  }, [request])
  
  const showOnWebSite = useCallback(async (event) => {
    const id = event.target.id
    const checked = event.target.checked
    try {
      const data = await request('/api/products/show', 'POST', {id, checked})
      if(data.status) {
        getProducts()
      }
    } catch (e) {}
  }, [request])

  useEffect(() => {
    getProducts()
  }, [getProducts])

  useEffect(() => {
    message(err)
    clearErr()
  }, [err, message, clearErr])

  const FilterExtends = (event) => {
    const str = event.target.value;
    const result = products.filter(item => item.name.match(str))
    if (result !== []) {
      setFilteredProducts(result)
    } else {
      setFilteredProducts(products)
    }
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
        <TextInput
          icon="search"
          id="filter"
          label="Введите имя товара"
          onChange={FilterExtends}
        />
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
            {filteredProducts.map(item => {
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
                      checked={item.show}
                      onChange={showOnWebSite}
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