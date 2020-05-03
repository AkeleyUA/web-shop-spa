import React, { useContext } from 'react'
import { Button, Modal, Table, Icon } from 'react-materialize'
import './ShoppingCart.scss'
import { useHttp } from '../../Hooks/http.hook'

export const ShoppingCart = ({modalStatus, modalHandler}) => {
  const { loading } = useHttp()

  const tBodyCreator = (arr) => {
    console.log(arr)
    if (arr.status && !loading) {
      return arr.data.map((item) => {
        return (
          <tr key={item._id}>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td
              onClick={() => {
              }}
            >
              <Icon>highlight_off</Icon>
            </td>
          </tr>
        )
      })
    }
  }

  const tableCreator = () => {
    return (
      <Table
        s={6}
        striped
        centered={false}
        responsive
      >
        <thead>
          <tr>
            <th data-field="name">
              Название
            </th>
            <th data-field="price">
              Цена
            </th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </Table>
    )
  }


  if (modalStatus) {
    return (
      <Modal
        className="my-modal"
        actions={[
          <img
            width="30%"
            src="https://www.pngarts.com/files/1/Visa-Logo-PNG-Image-Background.png"
          />,
          <div className="button-wrapper">
            <Button flat onClick={() => {modalHandler(false)}} node="button" waves="green">Close</Button>
            <Button className="blue darken-1" node="button" waves="light">Купить</Button>
          </div>
        ]}
        bottomSheet={false}
        fixedFooter={false}
        header="Корзина"
        id="Modal-0"
        open={modalStatus}
        options={{
          dismissible: true,
          endingTop: '10%',
          inDuration: 250,
          opacity: 0.5,
          outDuration: 250,
          preventScrolling: true,
          startingTop: '4%'
        }}
      >
        {tableCreator()}
      </Modal>
    )
  } else {
    return null
  }
}