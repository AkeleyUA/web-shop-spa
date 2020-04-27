import React, { useState, useEffect } from 'react'
import { Card, CardTitle, Icon, Button, Col } from 'react-materialize'
import { Link } from 'react-router-dom' 
import './CardsList.scss'

const productsFromDb = [
  { 
    id: 0,
    name: 'Товар-1',
    description: 'Описание товара-1',
    rate: 4,
    price: 12,
    amount: 3,
    img: 'https://image.jimcdn.com/app/cms/image/transf/dimension=1820x1280:format=jpg/path/s0d19460186ee283c/image/i979b3aa040567fdc/version/1533817004/image.jpg'
  },
  { 
    id: 1,
    name: 'Товар-2',
    description: 'Описание товара-2',
    rate: 4,
    price: 11,
    amount: 4,
    img: 'https://image.jimcdn.com/app/cms/image/transf/dimension=1820x1280:format=jpg/path/s0d19460186ee283c/image/i979b3aa040567fdc/version/1533817004/image.jpg'
  },
  { 
    id: 2,
    name: 'Товар-3',
    description: 'Описание товара-3',
    rate: 4,
    price: 12,
    amount: 3,
    img: 'https://image.jimcdn.com/app/cms/image/transf/dimension=1820x1280:format=jpg/path/s0d19460186ee283c/image/i979b3aa040567fdc/version/1533817004/image.jpg'
  },
  { 
    id: 3,
    name: 'Товар-4',
    description: 'Описание товара-4',
    rate: 4,
    price: 12,
    amount: 3,
    img: 'https://image.jimcdn.com/app/cms/image/transf/dimension=1820x1280:format=jpg/path/s0d19460186ee283c/image/i979b3aa040567fdc/version/1533817004/image.jpg'
  }
]

export const CardsList = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    setProducts(productsFromDb)
  }, [products])

  const cardsCreator = (array) => {
    if(array.length > 0) {
      return array.map(item => {
        return (
          <Col s={4} key={item.id}>
            <div className="card">
              <div className="card-image">
                <img src={item.img} />
              </div>
              <div className="card-content">
                <p>{item.description}</p>
              </div>
              <div className="card-action">
                <Button
                >
                  {`$${item.price}`}
                </Button>
              </div>
            </div>
          </Col>
        )
      })
    } else {
      return null
    }
  }
  return (
    <div className="cards-list">
      {cardsCreator(products)}
    </div>
  )
}