import React from 'react'
import { useParams } from 'react-router-dom'
import './DogDetails.css'

const DogDetails = ({ dogs }) => {
  const { name } = useParams()
  const data = dogs.find(dog => dog.name.toLowerCase() === name)

  if (!data) {
    return (
      <p>Loading</p>
    )
  }

  return (
    <div className='DogDetails'>
      <h4>{name}</h4>
      <img src={data.src} alt={data.name}></img>
      <div><b>Age:</b>{data.age}</div>
      <div><b>Facts:</b></div>
      <div>{data.facts.join(' ')}</div>
    </div>
  )
}

export default DogDetails
