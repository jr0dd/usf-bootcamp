import React from 'react'
import './Card.css'

const Card = ({ name, image }) => {
  return <img
    className='Card'
    alt={name}
    src={image}
  />
}

export default Card