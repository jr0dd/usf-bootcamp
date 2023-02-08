import { useState } from 'react'

const useFlip = () => {
  const [isFlipped, setFlipped] = useState(true)

  const flipCard = () => {
    setFlipped(isUp => !isUp)
  }

  return [isFlipped, flipCard]
}

export { useFlip }