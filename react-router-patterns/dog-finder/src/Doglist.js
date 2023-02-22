import React from 'react'
import { NavLink } from 'react-router-dom'
import './DogList.css'

const DogList = ({ dogs }) => {
  return (
    <div className='DogList'>
      <h3>Dog List:</h3>
      {dogs.map(dog => (
        <NavLink key={dog.name.toLowerCase()} to={`/dogs/${dog.name.toLowerCase()}`}>
          {dog.name}
        </NavLink>
      ))}
    </div>
  )
}

export default DogList
