import React from 'react'

const Box = ({
  id,
  backgroundColor,
  width,
  height,
  handleRemove
}) => {
  const rm = () => handleRemove(id)
  return (
    <div>
      <div
        style={{
          height: `${height}em`,
          width: `${width}em`,
          backgroundColor
        }}
      />
      <button onClick={rm}>X</button>
    </div>
  )
}

export default Box
