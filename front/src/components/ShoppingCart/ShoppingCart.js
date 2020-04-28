import React from 'react'
import { Button, Modal, Table } from 'react-materialize'
import './ShoppingCart.scss'

export const ShoppingCart = ({modalStatus, modalHandler}) => {

  if (modalStatus) {
    return (
      <Modal
        actions={[
          <Button flat onClick={() => {modalHandler(false)}} node="button" waves="green">Close</Button>
        ]}
        bottomSheet={false}
        fixedFooter={false}
        header="Modal Header"
        id="Modal-0"
        open={modalStatus}
        options={{
          dismissible: true,
          endingTop: '10%',
          inDuration: 250,
          opacity: 0.5,
          outDuration: 250,
          onCloseEnd: () => {modalHandler(false)},
          preventScrolling: true,
          startingTop: '4%'
        }}
      >
        <Table
            striped
            centered
          >
            <thead>
              <tr>
                <th data-field="id">
                  Номер
                </th>
                <th data-field="name">
                  Название
                </th>
                <th data-field="price">
                  Цена
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  1
                </td>
                <td>
                  Товар-1
                </td>
                <td>
                  $11.99
                </td>
              </tr>
              <tr>
                <td>
                  2
                </td>
                <td>
                  Товар-2
                </td>
                <td>
                  $12.99
                </td>
              </tr>
              <tr>
                <td>
                  3
                </td>
                <td>
                  Товар-3
                </td>
                <td>
                  $13.99
                </td>
              </tr>
            </tbody>
          </Table>
      </Modal>
    )
  } else {
    return null
  }
}