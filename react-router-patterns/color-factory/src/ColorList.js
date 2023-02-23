import React from 'react'
import { NavLink } from 'react-router-dom'
import './ColorList.css'

const ColorList = ({colors}) => {
  return (
    <div>
      <div>
        <h1>Welcome to the color factory!</h1>
        <NavLink to='/colors/new'>
          Add a color
        </NavLink>
      </div>
      <div className='ColorList'>
        <p>Please select a color:</p>
        {colors.map(color => (
          <NavLink key={color.name} to={`/colors/${color.name}`}>
            {color.name}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default ColorList
