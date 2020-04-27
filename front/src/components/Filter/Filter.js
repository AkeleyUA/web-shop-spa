import React, { useState, useEffect } from 'react'
import { Collapsible, CollapsibleItem, Checkbox } from 'react-materialize'

const categoryFromDb = [
  {
    name: 'Все категории',
    id: 'category-0'
  },
  {
    name: 'Категория 1',
    id: 'category-1'
  },
  {
    name: 'Категория 2',
    id: 'category-2'
  },
  {
    name: 'Категория 3',
    id: 'category-3'
  }
]

const deliveryesFromDb = [
  {
    name: 'Все способы',
    id: 'delivery-0'
  },
  {
    name: 'Доставка по почте',
    id: 'delivery-1'
  },
  {
    name: 'Доставка курьером',
    id: 'delivery-2'
  },
]

const brandsFromDb = [
  {
    name: 'Все бренды',
    id: 'brand-0'
  },
  {
    name: 'Бренд-1',
    id: 'brand-1'
  },
  {
    name: 'Бренд-2',
    id: 'brand-2'
  },
  {
    name: 'Бренд-3',
    id: 'brand-3'
  },
  {
    name: 'Бренд-4',
    id: 'brand-4'
  },
  {
    name: 'Бренд-5',
    id: 'brand-5'
  },
]

export const Filter = () => {
  const [categoryes, setCategoryes] = useState([])
  const [deliveryes, setDeliveryes] = useState([])
  const [brands, setBrends] = useState([])

  useEffect(() => {
    setCategoryes(categoryFromDb)
    setDeliveryes(deliveryesFromDb)
    setBrends(brandsFromDb)
  }, [categoryes, deliveryes, brands])

  const checkboxCreator = (array) => {
    if(array.length > 0) {
      return array.map((item, index) => {
        return (
          <p key={item.id}>
            <Checkbox
              id={item.id}
              label={item.name}
              value={item.name}
              checked={ index === 0 ? true : false }
            />
          </p>
        )
      })
    } else {
      return null
    }
  }

  return (
      <Collapsible
      accordion={false}
    >
      <CollapsibleItem
        expanded
        header="Категории"
      >
        {checkboxCreator(categoryes)}
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
        {checkboxCreator(deliveryes)}
      </CollapsibleItem>
    </Collapsible>
  )
}