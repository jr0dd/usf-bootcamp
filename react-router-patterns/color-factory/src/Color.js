import React from 'react'
import { NavLink, useParams } from 'react-router-dom'

const Color = ({colors}) => {
  const { color } = useParams()
  const { hex } = colors.find(c => c.name === color)

  return (
    <div className='Color' style={{ backgroundColor: hex }}>
      <p>Here is color {color}</p>
      <NavLink to='/colors'>
        Go back
      </NavLink>
    </div>
  )
}

export default Color
