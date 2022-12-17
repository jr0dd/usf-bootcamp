import React from 'react'
import './Pokecard.css'

const Pokecard = ({ id, name, type, exp }) => {
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
  return (
    <div className='Pokecard'>
      <h3 className='Pokecard-title'>{name}</h3>
      <img src={image} alt={name}/>
      <p>Type: {type}</p>
      <p>EXP: {exp}</p>
    </div>
  )
}

export default Pokecard