import React from 'react'
import { NavLink } from 'react-router-dom'

function NavBar() {
  return (
    <nav className='NavBar'>
      <NavLink exact to='/'>
        Home
      </NavLink>
      <NavLink exact to='/cheetos'>
        Cheetos
      </NavLink>
      <NavLink exact to='/doritos'>
        Doritos
      </NavLink>
      <NavLink exact to='/kitkat'>
        KitKat
      </NavLink>
      <NavLink exact to='/reeses'>
        Reeses
      </NavLink>
    </nav>
  )
}

export default NavBar
