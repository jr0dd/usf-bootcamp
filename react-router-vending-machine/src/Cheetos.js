import React from 'react'
import { Link } from 'react-router-dom'
import cheetos from './images/cheetos.png'

const Cheetos = () => {
  return (
    <div>
      <h1>Cheetos</h1>
      <img src={cheetos} alt=''/>
      <div>
        <h3>NOM NOM NOM!</h3>
        <Link to='/'>
          Go Back
        </Link>
      </div>
    </div>
  )
}

export default Cheetos
