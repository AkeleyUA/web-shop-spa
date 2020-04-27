import React from 'react'
import { NavLink } from 'react-router-dom'
import './Stepper.scss'

export const Stepper = () => {
  return (
    <div className="stepper-wrapper transparent">
      <NavLink className="light-blue-text text-darken-2" to="/">Каталог</NavLink>
    </div>
  )
}