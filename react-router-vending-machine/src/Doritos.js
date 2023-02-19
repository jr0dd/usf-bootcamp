import React from 'react'
import { Link } from 'react-router-dom'
import doritos from './images/doritos.png'

const Doritos = () => {
  return (
    <div>
      <h1>Doritos</h1>
      <img src={doritos} alt=''/>
      <div>
        <h3>CRUNCHY!</h3>
        <Link to='/'>
          Go Back
        </Link>
      </div>
    </div>
  )
}

export default Doritos
