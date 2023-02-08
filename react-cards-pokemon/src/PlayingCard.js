import React from 'react'
import backOfCard from './back.png'
import './PlayingCard.css'
import { useFlip } from './hooks'

/* Renders a single playing card. */
const PlayingCard = ({ front, back = backOfCard }) => {
  const [isFacingUp, flipCard] = useFlip()
  return (
    <img
      src={isFacingUp ? front : back}
      alt='playing card'
      onClick={flipCard}
      className='PlayingCard Card'
    />
  )
}

export default PlayingCard
