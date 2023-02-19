import React from 'react'
import { Link } from 'react-router-dom'
import reeses from './images/reeses.png'

const Reeses = () => {
  return (
    <div>
      <h1>Reeses</h1>
      <img src={reeses} alt=''/>
      <div>
        <h3>GIVE IT BACK!</h3>
        <Link to='/'>
          Go Back
        </Link>
      </div>
    </div>
  )
}

export default Reeses
