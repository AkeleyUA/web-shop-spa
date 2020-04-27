import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Icon } from 'react-materialize'

import './NavBar.scss'

export const NavBar = () => {
  return (
    <>
      <Navbar
        alignLinks="right"
        className="nav-bar white"
        brand={<NavLink className="brand-logo blue-grey-text text-darken-4" to="/">LOGOtip</NavLink>}
        id="mobile-nav"
        menuIcon={<Icon className="blue-grey-text text-darken-4">menu</Icon>}
        options={{
          draggable: true,
          edge: 'left',
          inDuration: 250,
          outDuration: 200,
          preventScrolling: true,
        }}
      >
        <NavLink className="blue-grey-text text-darken-4" to="/" >Каталог</NavLink>
        <NavLink className="blue-grey-text text-darken-4" to="/" >Поддержка</NavLink>
        <NavLink className="blue-grey-text text-darken-4" to="/" >Контакты</NavLink>
        <NavLink className="blue-grey-text text-darken-4" to="/" >О нас</NavLink>
      </Navbar>
    </>
  )
}