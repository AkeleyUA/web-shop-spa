import React from 'react'
import './Catalog.scss'
import { TextInput, Row, Col, Icon, Select, Button } from 'react-materialize'
import { Filter } from '../Filter/Filter'
import { CardsList } from '../CardsList/CardsList'

export const Catalog = () => {
  return (
    <div className="catalog-wrapper white">
      <Row>
        <Col s={3}>
          <h4 className="filter-title blue-grey-text text-darken-1">Товары (1)</h4>
        </Col>
        <TextInput
          s={3}
          placeholder="Введите категорию или наименование"
          icon={<Icon className="blue-grey-text text-darken-1">search</Icon>}
          label="Поиск"
          className="blue-grey-text text-darken-1"
        />
        <Select
          s="2 offset-s2"
          id="Select-9"
          multiple={false}
          options={{
            classes: '',
            dropdownOptions: {
              alignment: 'left',
              autoTrigger: true,
              closeOnClick: true,
              constrainWidth: true,
              coverTrigger: true,
              inDuration: 150,
              outDuration: 250
            }
          }}
          value=""
        >
          <option
            disabled
            value=""
          >
            Сортировать
          </option>
          <option value="1">
            Цена
          </option>
          <option value="2">
            Рейтинг
          </option>
          <option value="3">
            Акция
          </option>
        </Select>
      </Row>
      <Row>
        <Col s={3}>
          <Button
            className="full-width-btn blue darken-1"
            node="button"
            small={true}
          >
            Сравнить товары
          </Button>
          <Button
            className="full-width-btn orange darken-1"
            node="button"
            small={true}
          >
            Лучшие предложения
          </Button>
          <Filter/>          
        </Col>
        <Col s={9}>
          <CardsList />
        </Col>
      </Row>
    </div>
  )
}