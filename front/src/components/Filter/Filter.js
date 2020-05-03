import React, { useState, useEffect, useCallback, useContext } from 'react'
import { Collapsible, CollapsibleItem, RadioGroup, Preloader } from 'react-materialize'
import { useMessage } from '../../Hooks/message.hook'
import { useHttp } from '../../Hooks/http.hook'
import './Filter.scss'

const deliveryesFromDb = [
  {
    name: 'Все способы',
    _id: 'delivery-0'
  },
  {
    name: 'Доставка по почте',
    _id: 'delivery-1'
  },
  {
    name: 'Доставка курьером',
    _id: 'delivery-2'
  },
]

const brandsFromDb = [
  {
    name: 'Все бренды',
    _id: 'brand-0'
  },
  {
    name: 'Бренд-1',
    _id: 'brand-1'
  },
  {
    name: 'Бренд-2',
    _id: 'brand-2'
  },
  {
    name: 'Бренд-3',
    _id: 'brand-3'
  },
  {
    name: 'Бренд-4',
    _id: 'brand-4'
  },
  {
    name: 'Бренд-5',
    _id: 'brand-5'
  },
]

export const Filter = () => {
  const [categories, setCategories] = useState([])
  const [deliveries, setDeliveries] = useState([])
  const [brands, setBrends] = useState([])
  const { loading, err, request, clearErr } = useHttp()
  const message = useMessage()

  const getCategories = useCallback(async () => {
    try {
      const data = await request('/api/categories/get-for-client')
      setCategories(data)
      // home.setCurrentCategory(data[0].name)
    } catch (e) {}
  }, [request])

  useEffect(() => {
    getCategories()
    setDeliveries(deliveryesFromDb)
    setBrends(brandsFromDb)
  }, [])

  useEffect(() => {
    message(err)
    clearErr()
  },[err, message, clearErr])

  const changeValueHendler = (event) => {
    // home.setCurrentCategory(event.currentTarget.value)
  }

  const checkboxCreator = (array) => {
    return (
      <div className="categories-group">
        <RadioGroup
          label="Catgories"
          name="catgory"
          onChange={changeValueHendler}
          options={array.map(item => ({label: item.name, value: item.name}))}
          // value={home.current}
          withGap
        />
      </div>
    )
  }
  if (loading) {
    return (
      <div className="preloader-center">
        <Preloader />
      </div>
    )
  } else {
    return (
        <Collapsible
        accordion={false}
      >
        <CollapsibleItem
          expanded
          header="Категории"
        >
          {checkboxCreator(categories)}
        </CollapsibleItem>
        <CollapsibleItem
          expanded
          header="Бренд"
        >
          {checkboxCreator(brands)}
        </CollapsibleItem>
        <CollapsibleItem
          expanded
          header="Способ доставки"
        >
          {checkboxCreator(deliveries)}
        </CollapsibleItem>
      </Collapsible>
    )
  }
}