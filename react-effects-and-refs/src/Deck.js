import React, { useEffect, useState } from 'react'
import Card from './Card';
import axios from 'axios'
import './Deck.css'

const baseUrl = 'https://deckofcardsapi.com/api/deck'

const Deck = () => {
  const [deck, setDeck] = useState(null)
  const [drawn, setDrawn] = useState([])
  const [shuffling, setShuffling] = useState(false)

  useEffect(function loadDeck() {
    const getData = async () => {
      const res = await axios.get(`${baseUrl}/new/shuffle`)
      setDeck(res.data)
    }
    getData()
  }, [])

  const draw = async () => {
    try {
      const res = await axios.get(`${baseUrl}/${deck.deck_id}/draw/?count=1`)
      const card = res.data.cards[0]

      if (res.data.remaining === 0) {
        throw new Error('no cards remaining!')
      }

      setDrawn(c => [
        ...c,
        {
          id: card.code,
          name: `${card.suit} ${card.value}`,
          image: card.image,
        },
      ])
    } catch (err) {
      alert(err)
    }
  }

  const shuffle = async () => {
    setShuffling(true)
    try {
      await axios.get(`${baseUrl}/${deck.deck_id}/shuffle`)
      setDrawn([])
    } catch (err) {
      alert(err)
    } finally {
      setShuffling(false)
    }
  }

  const drawButton = () => {
    if (!deck) {
      return null
    }
    return (
      <button
        className='Deck-button'
        onClick={draw}
        disabled={shuffling}>
        Draw!
      </button>
    )
  }

  const shuffleButton = () => {
    if (!deck) {
      return null
    }
    return (
      <button
        className='Deck-button'
        onClick={shuffle}
        disabled={shuffling}>
        Shuffle
      </button>
    )
  }

  return (
    <div className='Deck'>
      <div className='Deck-button-row'>
        {drawButton()}
        {shuffleButton()}
      </div>
      <div className='Deck-stack'> {
        drawn.map(c => (
          <Card key={c.id} name={c.name} image={c.image} />
        ))}
      </div>
    </div>
  )
}

export default Deck