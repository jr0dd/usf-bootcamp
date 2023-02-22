import React from 'react'
import { Link } from 'react-router-dom'
import './DogList.css'

const DogList = ({ dogs }) => {
  return (
    <div className='DogList'>
      <h2>Dog List:</h2>
      {dogs.map(dog => (
        <div key={dog.name.toLowerCase()}>
          <Link to={`/dogs/${dog.name.toLowerCase()}`}>
            {dog.name}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default DogList
