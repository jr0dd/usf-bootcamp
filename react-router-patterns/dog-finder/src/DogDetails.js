import React from 'react'
import { useParams } from 'react-router-dom'
import './DogDetails.css'

const DogDetails = ({ dogs }) => {
    const { dogName } = useParams()
    const { age, facts, name, src } = dogs.filter(dog => dog.name.toLowerCase() === dogName.toLowerCase())[0] 

    return (
      <div className='DogDetails'>
        <h4>{name}</h4>
        <img src={src} alt={name.toLowerCase()}></img>
        <div><b>Age:</b>{age}</div>
        <div><b>Facts:</b></div>
        <div>{facts.join(' ')}</div>
      </div>
    )
}

export default DogDetails
