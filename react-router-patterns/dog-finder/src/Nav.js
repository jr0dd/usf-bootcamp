import React from 'react'
import { Link } from 'react-router-dom'
import whiskey from './images/whiskey.jpeg'
import duke from './images/duke.jpeg'
import perry from './images/perry.jpeg'
import tubby from './images/tubby.jpeg'

const Nav = ({ dogs }) => {
  return (
    <ul>
      {dogs.map(dog => (
        <li key={dog.name.toLowerCase()}>
          <Link to={`/dogs/${dog.name.toLowerCase()}`}>
            {dog.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

Nav.defaultProps = {
  dogs: [
    {
      name: 'Whiskey',
      age: 5,
      src: whiskey,
      facts: [
        'Whiskey loves eating popcorn.',
        'Whiskey is a terrible guard dog.',
        'Whiskey wants to cuddle with you!'
      ]
    },
    {
      name: 'Duke',
      age: 3,
      src: duke,
      facts: [
        'Duke believes that ball is life.',
        'Duke likes snow.',
        'Duke enjoys pawing other dogs.'
      ]
    },
    {
      name: 'Perry',
      age: 4,
      src: perry,
      facts: [
        'Perry loves all humans.',
        'Perry demolishes all snacks.',
        'Perry hates the rain.'
      ]
    },
    {
      name: 'Tubby',
      age: 4,
      src: tubby,
      facts: [
        'Tubby is really stupid.',
        'Tubby does not like walks.',
        'Angelina used to hate Tubby, but claims not to anymore.'
      ]
    }
  ]
}

export default Nav
