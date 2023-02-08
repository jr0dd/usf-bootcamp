import { useState } from 'react'
import axios from 'axios'
import { v4 as uuid } from 'uuid'

const useFlip = () => {
  const [isFlipped, setFlipped] = useState(true)

  const flipCard = () => {
    setFlipped(isUp => !isUp)
  }

  return [isFlipped, flipCard]
}

const useAxios = (baseUrl) => {
  const [responses, setResponses] = useState([])

  const resData = async (path) => {
    const res = await axios.get(`${baseUrl}${path}`)
    setResponses(data => [...data, { ...res.data, id: uuid() }])
  }

  return [responses, resData]
}

export { useFlip, useAxios }