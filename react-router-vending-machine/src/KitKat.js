import React from 'react'
import { Link } from 'react-router-dom'
import kitkat from './images/kitkat.png'

const KitKat = () => {
  return (
    <div>
      <h1>KitKat</h1>
      <img src={kitkat} alt=''/>
      <div>
        <h3>THIS IS MY KITKAT!</h3>
        <Link to='/'>
          Go Back
        </Link>
      </div>
    </div>
  )
}

export default KitKat
