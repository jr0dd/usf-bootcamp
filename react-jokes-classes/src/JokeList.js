import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Joke from './Joke'
import './JokeList.css'

/** List of jokes. */

const JokeList = ({numJokesToGet = 5}) => {
  const [jokes, setJokes] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  /* at mount, get jokes */

  useEffect(function () {
    const getJokes = async () => {
      const j = [...jokes]
      const seenJokes = new Set()
      try {
        while (j.length < numJokesToGet) {
          const res = await axios.get('https://icanhazdadjoke.com', {
            headers: { Accept: 'application/json' }
          })
          const { ...jokeObj } = res.data

          if (!seenJokes.has(jokeObj.id)) {
            seenJokes.add(jokeObj.id)
            j.push({ ...jokeObj, votes: 0 })
          } else {
            console.error('duplicate found!')
          }
        }
        setJokes(j)
        setIsLoading(false)
      } catch (err) {
        console.error(err)
      }
    }
    if (jokes.length === 0) getJokes();
  }, [jokes, numJokesToGet])

  /* empty joke list, set to loading state, and then call getJokes */

  const generateNewJokes = () => {
    setJokes([])
    setIsLoading(true)
  }

  /* change vote for this id by delta (+1 or -1) */

  const vote = (id, delta) => {
    setJokes(allJokes =>
      allJokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
    )
  }

  /* render: either loading spinner or list of sorted jokes. */

  if (isLoading) {
    return (
      <div className='loading'>
        <i className='fas fa-4x fa-spinner fa-spin' />
      </div>
    )
  }

  const sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes)

  return (
    <div className='JokeList'>
      <button className='JokeList-getmore' onClick={generateNewJokes}>
        Get New Jokes
        </button>

      {sortedJokes.map(({joke, id, votes}) => (
        <Joke
          key={id}
          text={joke}
          id={id}
          votes={votes}
          vote={vote}
        />
      ))}
    </div>
  )
}

export default JokeList
