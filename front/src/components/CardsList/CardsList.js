import React, { useState, useEffect, useCallback, useContext } from 'react'
import { Button, Col, ProgressBar, Card, Icon, CardTitle } from 'react-materialize'
import './CardsList.scss'
import { useHttp } from '../../Hooks/http.hook'
import { useMessage } from '../../Hooks/message.hook'

export const CardsList = () => {
  const [products, setProducts] = useState([])
  const [current, setCurrent] = useState(null)
  const message = useMessage()
  const { loading, err, request, clearErr } = useHttp()

  const getProducts = useCallback(async (category) => {
    try {
      const data = await request('/api/products/get-products', 'POST', { category: category || 123})
      setProducts(data)
      // home.setProductsLength(data.length)
    } catch (e) {}
  }, [request])

  // if ( current !== home.current) {
  //   setCurrent(home.current)
  //   getProducts(home.current)
  // }

  useEffect(() => {
    message(err)
    clearErr()
  },[err, message, clearErr])

  const cardsCreator = (array) => {
    return array.map(item => {
      return (
        <Col s={4} key={item._id}>
          <Card key={item._id + "card"}
            actions={[
                <p key={item._id + "amount"} className="amount">
                  В наличии: {item.amount}
                </p>,
                <Button
                  className="blue darken-1"
                  key={item._id + "button"}
                  // onClick={() => home.addToCart(item._id)}
                >
                  {`$${item.price}`}
                </Button>
            ]}
            closeIcon={<Icon>close</Icon>}
            header={<CardTitle image={item.img}></CardTitle>}
            revealIcon={<Icon>more_vert</Icon>}
          >
            <h4 className="black-text">{item.name}</h4>
            <p>{item.description}</p>
          </Card>
        </Col>
      )
    })
  }
  return (
    <div className="cards-list">
      {loading ? <ProgressBar /> : cardsCreator(products)}
    </div>
  )
}