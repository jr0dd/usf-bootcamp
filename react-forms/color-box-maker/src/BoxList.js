import React, { useState } from 'react'
import Box from './Box'
import NewBoxForm from './NewBoxForm'

const BoxList = () => {
  const [boxes, setBoxes] = useState([])
  const add = box => {
    setBoxes(boxes => [...boxes, box])
  }
  const remove = id => {
    setBoxes(boxes => boxes.filter(b => b.id !== id))
  }

  const boxMap = boxes.map(b => (
    <Box
      key={b.id}
      id={b.id}
      width={b.width}
      height={b.height}
      backgroundColor={b.backgroundColor}
      handleRemove={remove}
    />
  ))

  return (
    <div>
      <NewBoxForm addBox={add} />
      {boxMap}
    </div>
  )
}

export default BoxList
