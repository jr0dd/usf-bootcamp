import React from 'react'

const Todo = ({ task, id, handleRemove }) => {
  const rm = () => handleRemove(id)
  return (
    <div>
      <div>{task}</div>
      <button onClick={rm}>X</button>
    </div>
  )
}

export default Todo
