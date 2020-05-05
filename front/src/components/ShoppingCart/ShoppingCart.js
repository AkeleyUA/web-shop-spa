import React, { useState } from 'react'

import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'

import './ShoppingCart.scss'

export const ShoppingCart = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  const rows = [
    {
      name: 'Товар1',
      price: 100
    },
    {
      name: 'Товар1',
      price: 100
    },
    {
      name: 'Товар1',
      price: 100
    },
    {
      name: 'Товар1',
      price: 100
    },
    {
      name: 'Товар1',
      price: 100
    },
    {
      name: 'Товар1',
      price: 100
    },
    {
      name: 'Товар1',
      price: 100
    },
    {
      name: 'Товар1',
      price: 100
    },
    {
      name: 'Товар1',
      price: 100
    },
    {
      name: 'Товар1',
      price: 100
    },
    {
      name: 'Товар1',
      price: 100
    },
    {
      name: 'Товар1',
      price: 100
    },
    {
      name: 'Товар1',
      price: 100
    },
    {
      name: 'Товар1',
      price: 100
    },
    {
      name: 'Товар1',
      price: 100
    },
    {
      name: 'Товар1',
      price: 100
    }
  ]
  const columns = [
    {
      id: 'name',
      label: "Название",
    },
    {
      id: 'price',
      label: "Цена",
    },
    {
      id: 'delete',
      label: "Удалить",
    },
  ]

  return (
    <Paper style={{ width: "100%" }} className="table-wrapper">
      <TableContainer style={{ height: 325 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="Товаров на странице"
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <div>Всего: {rows.map(item => item.price).reduce((a, b) => (a + b))}</div>
    </Paper>
  )
}