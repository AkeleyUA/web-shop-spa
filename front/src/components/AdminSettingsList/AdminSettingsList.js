import React from 'react'
import { NavLink } from 'react-router-dom'

export const AdminSettingsList = () => {

  return (
    <div className="admin-settings-list">
      <ul>
        <li>
          <NavLink to='/admin/products'>Список товаров</NavLink>
          <NavLink to='/admin/categories'>Список категорий</NavLink>
        </li>
      </ul>
    </div>
  )
}